import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import './styles.scss';
import { useQuery } from "react-query";
import { AiFillDelete } from "react-icons/ai";
import { GroupApi } from "../../../entities/group/api";
import { useNavigate } from "react-router-dom";
import { SharedUi } from "../../../shared/sharedUi";
import { GMTypes, GroupMembershipStatuses, MembershipRequest, OneGroup, OneGroupWithMembership } from "../../../entities/group";
import { Helpers } from "../../../shared/helpers";
import { SubscriptionFeaturesLib } from "../../../fetures/subscription/hooks";
import { GroupFeaturesLib } from "../../../fetures/group";

interface SBProps {
  group: OneGroup,
  setSubscribed: (subscribed: boolean) => void,
}
const SubscribeButton: FC<SBProps> = ({ group, setSubscribed }) => {

  const { user } = useAppSelector(state => state.user);

  const subscribeStatus = SubscriptionFeaturesLib.useSubscribe(user!.id, group.authorId, setSubscribed);
  const unsubscribeStatus = SubscriptionFeaturesLib.useUnubscribe(user!.id, group.authorId, setSubscribed);

  const status = group.author.subscribed ? unsubscribeStatus : subscribeStatus;

  return (
    <SharedUi.Buttons.BynareWhiteButton
      isLoading={status.isLoading}
      isError={status.isLoading}
      className="subscribe-button"
      body={group.author.subscribed ? 'Unsubscribe' : 'Subscribe'}
      onClick={() => status.mutate()}
    />
  )
}

interface ESLProps {
  body: string,
  isLoading: boolean,
  isError: boolean,
  onClick: () => void,
}
const ExtraSectionLine: FC<ESLProps> = ({ body, isLoading, isError, onClick }) => {

  return (
    <p
      className="extra-section-line to-gray-back"
      onClick={onClick}
    >
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
        size={10}
      >
        {body}
      </SharedUi.Helpers.LoadErrorHandler>
    </p>
  )
}

interface EBProps {
  group: OneGroupWithMembership,
  createRequest: (request: MembershipRequest) => void,
  deleteRequest: () => void,
}
const ElseButton: FC<EBProps> = ({ group, createRequest, deleteRequest }) => {

  const { user } = useAppSelector(state => state.user);

  const createRequestStatus = GroupFeaturesLib.useCreateMembRequest(group.id, createRequest);
  const deleteRequestStatus = GroupFeaturesLib.useDeleteRequest(group.id, user!.id, deleteRequest);

  const navigate = useNavigate();

  return (
    <SharedUi.Buttons.ButtonWithExtraSection
      buttonClass="else-button gray-to-light-back"
      name="Else"
    >
      {(group.membership === GMTypes.ADMIN) && (
        <p
          className="extra-section-line to-gray-back"
          onClick={() => navigate('/groupEdit/' + group.id)}
        >
          Редактировать
        </p>
      )}
      {(!group.membership && !group.request) && (
        <ExtraSectionLine
          body="Подать заявку"
          isLoading={createRequestStatus.isLoading}
          isError={createRequestStatus.isError}
          onClick={() => {
            createRequestStatus.mutate()
          }}
        />
      )}
      {(!group.membership && group.request && group.request.status === GroupMembershipStatuses.WAITING) && (
        <ExtraSectionLine
          body="Удалить заявку"
          isLoading={deleteRequestStatus.isLoading}
          isError={deleteRequestStatus.isError}
          onClick={() => {
            deleteRequestStatus.mutate();
          }}
        />
      )}
    </SharedUi.Buttons.ButtonWithExtraSection>
  )
}

// interface DGBProps {
//   group: OneGroup | undefined
// }
// const DeleteGroupButton: FC<DGBProps> = ({ group }) => {

//   const navigate = useNavigate();

//   const { data, isLoading, isError, refetch } = useQuery(
//     ['deleteGroup', group?.id],
//     () => {
//       if (group) {
//         return GroupApi.deleteGroup(group.id);
//       }
//     },
//     {
//       enabled: false,
//       onSuccess: () => {
//         navigate('/home');
//       }
//     }
//   )

//   if (isLoading) {
//     return (
//       <button className="delete-group-button">
//         <SharedUi.Icons.Spinner size={25} />
//       </button>
//     )
//   }
  
//   return (
//     <button 
//       className="delete-group-button white"
//       onClick={() => refetch()}
//     >
//       <AiFillDelete size={25} />
//     </button>
//   )
// }

interface GroupPanelProps {
  group: OneGroupWithMembership | undefined,
  isLoading: boolean,
  isError: boolean,
  setSubscribed: (subscribed: boolean) => void,
  createRequest: (request: MembershipRequest) => void,
  deleteRequest: () => void,
}

export const GroupHeader: FC<GroupPanelProps> = ({ group, isLoading, isError, setSubscribed, createRequest, deleteRequest }) => {

  const dispatch = useAppDispatch();

  return (
    <div className="group-header regular-panel">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
      >
        {group ? (
          <>
            <div className="avatar">
              <img 
                src={Helpers.getImageSrc(group.avatar)}
                alt="AVATAR_GROUP" 
              />
              <div className="desc">
                <h3>{group.name}</h3>
                <p className="extra">{group.author.subsNumber + ' subs'}</p>
              </div>
            </div>
            <div className="right">
              <div className="buttons">
                <SubscribeButton 
                  group={group} 
                  setSubscribed={setSubscribed}
                />
                <ElseButton
                  createRequest={createRequest}
                  group={group}
                  deleteRequest={deleteRequest}
                />
              </div>
            </div>
          </>
        ) : (
          <div>Что-то пошло не так</div>
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}