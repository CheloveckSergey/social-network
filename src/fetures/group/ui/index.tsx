import { ChangeEvent, FC, useState } from "react";
import { GroupFeaturesLib } from "../lib";
import { SharedUi } from "../../../shared/sharedUi";
import './styles.scss';
import { BsThreeDots } from "react-icons/bs";
import { GMTypes, GroupMembershipStatuses, MembershipRequest } from "../../../entities/group";
import { UseModalWindow } from "../../../widgets/anotherModalWindow/ui";

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
      body="Заявка принята"
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

interface CGMTBProps {
  memberId: number,
  changeGMType?: (memberId: number, type: GMTypes) => void,
}
const ChangeGMTypeButton: FC<CGMTBProps> = ({ memberId, changeGMType }) => {
  
  const [showWindow, setShowWindow] = useState<boolean>(false)

  function close() {
    setShowWindow(false);
  }

  return (
    <>
      <SharedUi.Buttons.ExtraLine
        onClick={() => {
          setShowWindow(true);
        }}
      >
        Изменить тип
      </SharedUi.Buttons.ExtraLine>
      <UseModalWindow
        condition={showWindow}
        onClose={close}
      >
        <ChangeGMTypeWindow
          memberId={memberId}
          changeGMType={changeGMType}
          close={close}
        />
      </UseModalWindow>
    </>
  )
}

interface CGMTWProps {
  memberId: number,
  changeGMType?: (memberId: number, type: GMTypes) => void,
  close: () => void,
}
const ChangeGMTypeWindow: FC<CGMTWProps> = ({ memberId, changeGMType, close }) => {

  const [type, setValue] = useState<GMTypes>(GMTypes.MEMBER);

  const {
    mutateAsync,
    isLoading,
    isError,
  } = GroupFeaturesLib.useChangeGMType(memberId, type, changeGMType);

  return (
    <div className="window change-gmtype-window">
      <p>Choose the type of the member:</p>
      <div className="input-section">
        {Object.values(GMTypes).map((value, index) => (
          <label 
            key={index}
          >
            <input 
              type="radio" 
              value={value}
              checked={value === type ? true : false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <div className="button-section">
        <SharedUi.Buttons.BynareWhiteButton 
          body="Изменить тип"
          onClick={() => mutateAsync().then(() => close())}
          isLoading={isLoading}
          isError={isError}
          className=""
        />
      </div>
    </div>
  )
}

export const GroupFeaturesUi = {
  AcceptRequestButton,
  DeleteMemberExtraLine,
  CancelAcceptRequest,
  ChangeGMTypeButton,
}