import { FC } from "react"
import { OneUser } from "../../../entities/user"
import { Hooks } from "../hooks"
import './styles.scss';
import { SharedUi } from "../../../shared/sharedUi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsFillBackspaceFill } from "react-icons/bs";

interface AFBProps {
  user: OneUser,
  effects: {
    setFriendship: (isFriend: boolean) => void,
  }
}
const AddFriendButton: FC<AFBProps> = ({ user, effects }) => {

  // const { refetch, isLoading, isError } = Hooks.useFriendship(user, effects);

  // if (isLoading) {
  //   return (
  //     <button
  //       className="add-friend-button"
  //     >
  //       <SharedUi.Icons.Spinner size={25} />
  //     </button>
  //   )
  // }

  return (
    <button
      className="add-friend-button inherit-to-green"
      // onClick={() => refetch()}
    >
      {user.isFriend ? (
        <BsFillBackspaceFill size={25} />
      ) : (
        <AiOutlineUserAdd size={25} />
      )}
    </button>
  )
}

export const Ui = {
  AddFriendButton,
}