import { FC } from "react";
import { BsSearch } from "react-icons/bs";
import { MeUser } from "../../../entities/user";

interface IBProps {
  user: MeUser,
}
export const InputBlock: FC<IBProps> = ({ user }) => {

  return (
    <div className="input-block">
      <div className="input">
        <input type="text" />
      </div>
      <button className="light-back">
        <BsSearch size={20} />
      </button>
    </div>
  )
}