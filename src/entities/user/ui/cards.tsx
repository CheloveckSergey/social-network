import { FC, useState } from "react"
import { OneUser } from "../model"
import { getImageSrc } from "../../../shared/service/images"
import { useNavigate } from "react-router-dom"
import { BsThreeDots } from "react-icons/bs"
import Rotator from "../../../shared/rotator"
import './styles.scss'

interface FLProps {
  user: OneUser,
  hook: Hook,
}
const FeatureLine: FC<FLProps> = ({ user, hook }) => {

  const { refetch, isLoading, isError, headline, isSuccess } = hook(user);

  return (
    <h4 
      className="feature-line"
      onClick={() => refetch}
    >
      <span>
        {headline}
      </span>
      <span>
        {isLoading && <Rotator size={15} />}
        {isError && 'E'}
      </span>
    </h4>
  )
}

interface EPProps {
  user: OneUser,
  hooks: Hook[],
}
const ExtraPanel: FC<EPProps> = ({ user, hooks }) => {


  return (
    <div className="extra-user-panel extra-panel">
      {hooks.map((hook, index) => <FeatureLine 
        key={index}
        hook={hook}
        user={user}
      />)}
      <h4>Tralala</h4>
      <h4>Trololo</h4>
    </div>
  )
}

interface ESProps {
  user: OneUser,
  hooks: Hook[], 
}
const ExtraSectionButton: FC<ESProps> = ({ user, hooks }) => {

  return (
    <div className="user-extra-section">
      <button className="white">
        <BsThreeDots size={25}/>
      </button>
      <ExtraPanel user={user} hooks={hooks} />
    </div>
  )
}

export type Hook = (user: OneUser) => {
  headline: string,
  refetch: () => any,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
}

interface ULCProps {
  user: OneUser,
  hooks: Hook[],
}
export const UserListCard: FC<ULCProps> = ({ user: _user, hooks }) => {
  const [user, setUser] = useState<OneUser>(_user);

  const setFriendship = (isFriend: boolean) => {
    setUser({...user, isFriend});
  }
  
  const navigate = useNavigate();

  return (
    <div className="user-friend-card">
      <img src={getImageSrc(user.avatar)} alt="IMG" />
      <div className="main-info">
        <h4 
          onClick={() => navigate('/user/' + user.id)}
          className="login"
        >
          {user.login}
        </h4>
      </div>
      <ExtraSectionButton user={user} hooks={hooks} />
    </div>
  )
}