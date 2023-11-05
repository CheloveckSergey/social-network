import { FC, useState } from "react"
import { Hook, OneUser } from "../model"
import { getImageSrc } from "../../../shared/service/images"
import { useNavigate } from "react-router-dom"
import { BsThreeDots } from "react-icons/bs"
import Rotator from "../../../shared/rotator"
import './styles.scss'

interface FLProps {
  user: OneUser,
  hook: Hook<Effects>,
  effects: {
    setFriendship: (isFriend: boolean) => void,
    setSubscription: (isSubscribed: boolean) => void,
  }
}
const FeatureLine: FC<FLProps> = ({ user, hook, effects }) => {

  const { refetch, isLoading, isError, headline, isSuccess } = hook(user, effects);

  return (
    <h4 
      className="feature-line"
      onClick={() => refetch()}
    >
      <span className="headline">
        {headline}
      </span>
      <span className="status">
        {isLoading && <Rotator size={15} />}
        {isError && 'E'}
      </span>
    </h4>
  )
}

interface EPProps {
  user: OneUser,
  hooks: Hook<Effects>[],
  effects: {
    setFriendship: (isFriend: boolean) => void,
    setSubscription: (isSubscribed: boolean) => void,
  }
}
const ExtraPanel: FC<EPProps> = ({ user, hooks, effects }) => {


  return (
    <div className="extra-user-panel extra-panel">
      {hooks.map((hook, index) => <FeatureLine
        key={index}
        hook={hook}
        user={user}
        effects={effects}
      />)}
      <h4>Tralala</h4>
      <h4>Trololo</h4>
    </div>
  )
}

interface ESProps {
  user: OneUser,
  hooks: Hook<Effects>[],
  effects: {
    setFriendship: (isFriend: boolean) => void,
    setSubscription: (isSubscribed: boolean) => void,
  }
}
const ExtraSectionButton: FC<ESProps> = ({ user, hooks, effects }) => {

  return (
    <div className="user-extra-section">
      <button className="white">
        <BsThreeDots size={25}/>
      </button>
      <ExtraPanel user={user} hooks={hooks} effects={effects} />
    </div>
  )
}

interface Effects {
  setFriendship: (isFriend: boolean) => void,
  setSubscription: (isSubscribed: boolean) => void
}

interface ULCProps {
  user: OneUser,
  hooks: Hook<Effects>[],
}
export const UserListCard: FC<ULCProps> = ({ user: _user, hooks }) => {
  const [user, setUser] = useState<OneUser>(_user);

  const setFriendship = (isFriend: boolean) => {
    setUser({...user, isFriend});
  }

  const setSubscription = (isSubscribed: boolean) => {
    setUser({
      ...user,
      author: {
        ...user.author,
        subscribed: isSubscribed,
      }
    })
  }

  const effects = {
    setFriendship,
    setSubscription,
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
      <ExtraSectionButton user={user} hooks={hooks} effects={effects} />
    </div>
  )
}