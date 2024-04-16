import { FC } from "react";
import { GroupFeaturesLib } from "../lib";
import { SharedUi } from "../../../shared/sharedUi";
import './styles.scss';
import { BsThreeDots } from "react-icons/bs";
import { GroupMembershipStatuses, MembershipRequest } from "../../../entities/group";

interface ARBProps {
  request: MembershipRequest,
  acceptRequest?: (requestId: number) => void,
}
const AcceptRequestButton:FC<ARBProps> = ({ request, acceptRequest }) => {

  const { 
    mutate,
    isLoading,
    isError,
  } = GroupFeaturesLib.useAcceptRequest(acceptRequest);

  if (request.status === GroupMembershipStatuses.ACCEPTED) {
    return (
      <button
        className="accept-request-button white-back-disabled"
        disabled={true}
      >
        Принять
      </button>
    )
  }

  return (
    <button
      className="accept-request-button white-back"
      onClick={() => {
        mutate({requestId: request.id})
      }}
    >
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
        size={10}
      >
        Принять
      </SharedUi.Helpers.LoadErrorHandler>
    </button>
  )
}

interface DMELProps {
  memberId: number,
  deleteMember?: (memberId: number) => void,
}
const DeleteMemberExtraLine:FC<DMELProps> = ({ memberId, deleteMember }) => {
  
  const { mutate, isLoading, isError } = GroupFeaturesLib.useDeleteMember(memberId, deleteMember);

  return (
    <SharedUi.Buttons.ExtraActionLine
      body='Delete'
      isLoading={isLoading}
      isError={isError}
      onClick={() => mutate()}
    />
  )
}

interface CARProps {
  userId: number,
  groupId: number,
  requestId: number,
  cancelAcceptRequest?: (requestId: number) => void,
}
const CancelAcceptRequest:FC<CARProps> = ({ userId, groupId, requestId, cancelAcceptRequest }) => {

  const {
    mutate,
    isLoading,
    isError,
  } = GroupFeaturesLib.useCancelAcceptRequest(userId, groupId, requestId, cancelAcceptRequest);

  return (
    <SharedUi.Buttons.ButtonWithExtraSection
      buttonClass="cancel-accept-request"
      name="Заявка принята"
    >
      <SharedUi.Buttons.ExtraActionLine 
        body='Отмена'
        onClick={() => mutate()}
        isLoading={isLoading}
        isError={isError}
      />
    </SharedUi.Buttons.ButtonWithExtraSection>
  )
}

export const GroupFeaturesUi = {
  AcceptRequestButton,
  DeleteMemberExtraLine,
  CancelAcceptRequest,
}