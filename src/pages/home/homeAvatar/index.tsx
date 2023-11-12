import { FC } from "react";
import { User } from "../../../entities/user";
import { useAppDispatch } from "../../../app/store";
import { getImageSrc } from "../../../shared/service/images";
import { WindowTypes, setWindow } from "../../../widgets/modalWindow/model/redux";
import './styles.scss';

interface HomeAvatarProps {
  user: User | undefined,
}

export const HomeAvatar: FC<HomeAvatarProps> = ({ user }) => {

  const dispatch = useAppDispatch();

  const img = getImageSrc(user?.avatar) || 'https://pichold.ru/wp-content/uploads/2021/03/10976505-1.jpg';

  return (
    <div className="home-avatar regular-panel">
      <img src={img} alt={process.env.REACT_APP_BACK_URL} />
      <button
        onClick={() => dispatch(setWindow({window: WindowTypes.LOAD_USER_AVATAR}))}
      >
        Edit
      </button>
    </div>
  )
}