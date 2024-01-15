import { FC } from "react"
import { OneUser } from "../../../entities/user"
import { Hooks } from "../hooks"
import './styles.scss';
import { SharedUi } from "../../../shared/sharedUi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsFillBackspaceFill } from "react-icons/bs";
import { ActionsLib, Friendship } from "..";
import { useAppSelector } from "../../../app/store";
import { FriendRequest } from "../../../entities/friends";

interface AFBProps {
  user: OneUser,
  effects: {
    setFriendship: (isFriend: boolean) => void,
  }
}
const CreateRequestButton: FC<AFBProps> = ({ user, effects }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  const {
    refetch,
    requestCreated,
    isLoading,
    isError,
  } = ActionsLib.useCreateRequest(meUser!.id, user.id);

  if (isLoading) {
    return (
      <button
        className="add-friend-button"
      >
        <SharedUi.Icons.Spinner size={25} />
      </button>
    )
  }

  return (
    <button
      className="add-friend-button inherit-to-green"
      onClick={() => refetch()}
    >
      {requestCreated ? (
        <BsFillBackspaceFill size={25} />
      ) : (
        <AiOutlineUserAdd size={25} />
      )}
    </button>
  )
}

interface ARBProps {
  request: FriendRequest,
}
const AcceptRequestButton: FC<ARBProps> = ({ request }) => {

  const {
    refetch,
    success,
    isLoading,
    isError,
  } = ActionsLib.useAcceptRequest(request.id);

  if (success) {
    return (
      <span className="success-container">
        Принято
      </span>
    )
  }

  return (
    <button
      className="accept-button green"
      onClick={() => refetch()}
      disabled={success || isLoading || isError}
    >
      {isLoading ? (
        <SharedUi.Icons.Spinner size={15} />
      ) : isError ? (
        <SharedUi.Icons.Error size={15} />
      ) : (
        <>
          Принять
        </>
      )}
    </button>
  )
}

interface RRBProps {
  request: FriendRequest,
}
const RejectRequestButton: FC<RRBProps> = ({ request }) => {

  const {
    refetch,
    success,
    isLoading: isAcceptLoading,
    isError: isAcceptError,
  } = ActionsLib.useRejectRequest(request.id);

  if (success) {
    return (
      <span className="success-container">
        Отклонено
      </span>
    )
  }

  return (
    <button
      className="reject-button white-back"
      onClick={() => refetch()}
      disabled={success}
    >
      Отклонить
    </button>
  )
}

interface CRBProps {
  request: FriendRequest,
}
const CancelRequestButton: FC<CRBProps> = ({ request }) => {

  const {
    refetch,
    success,
    isLoading: isAcceptLoading,
    isError: isAcceptError,
  } = ActionsLib.useCancelRequest(request.id);

  if (success) {
    return (
      <span className="success-container">
        Отменено
      </span>
    )
  }

  return (
    <button
      className="reject-button white-back"
      onClick={() => refetch()}
      disabled={success}
    >
      Отменить
    </button>
  )
}

export const Ui = {
  CreateRequestButton,
  AcceptRequestButton,
  RejectRequestButton,
  CancelRequestButton,
}