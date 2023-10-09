import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import LoadErrorHandler from "../../../shared/loadErrorHandler";
import { Group } from "../../../entities/group";
import { WindowTypes, setWindow } from "../../../widgets/modalWindow/model/redux";
import './styles.scss';
import { useQuery } from "react-query";
import { AuthorApi } from "../../../entities/author/api";
import Rotator from "../../../shared/rotator";

interface SBProps {
  group: Group | undefined;
  setSubscribed: React.Dispatch<React.SetStateAction<boolean>>,
}

const UnsubscribeButton: FC<SBProps> = ({ group, setSubscribed }) => {

  const { user } = useAppSelector(state => state.user);

  const { refetch, data, isLoading ,isError, status } = useQuery(
    ['subscribeGroup', group?.id, user?.id],
    () => {
      if (user && group) {
        return AuthorApi.unsubscribe(group.author.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setSubscribed(false);
      },
    }
  )

  //По факту эта хуйня не работает, т.к. loading срабатывает только один раз, я хз почему так
  if (status === 'loading') {
    return (
      <div className="loading-subscribe">
        <Rotator />
      </div>
    )
  }

  return (
    <div className="subscribe subscribed">
      <p>You'are subscribed</p>
      <button 
        className="extra-panel extra-unsubscribe-panel"
        onClick={() => refetch()}
      >
        <p>Unsuscribe</p>
      </button>
    </div>
  )
}

const SubscribeButton: FC<SBProps> = ({ group, setSubscribed }) => {

  const { user } = useAppSelector(state => state.user);

  const { isLoading, refetch, status } = useQuery(
    ['subscribeGroup', group?.id, user?.id],
    () => {
      if (user && group) {
        return AuthorApi.subscribe(group.author.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setSubscribed(true);
      }
    }
  );

  if (status === 'loading') {
    return (
      <div className="loading-subscribe">
        <Rotator />
      </div>
    )
  }

  return (
    <button 
      className="subscribe white-back"
      onClick={() => refetch()}
    >
      Subscribe
    </button>
  )
}

interface SPProps {
  group: Group | undefined;
}

const SubscribePanel: FC<SPProps> = ({ group }) => {

  const [subscribed, setSubscribed] = useState<boolean>(false);

  useEffect(() => {
    if (group?.author.subscribedFor) {
      setSubscribed(true);
    }
  }, [])

  if (subscribed) {
    return (
      <UnsubscribeButton group={group} setSubscribed={setSubscribed} />
    )
  }

  return (
    <SubscribeButton group={group} setSubscribed={setSubscribed} /> 
  )
}

interface GroupPanelProps {
  group: Group | undefined,
  isLoading: boolean,
  isError: boolean,
}

export const GroupHeader: FC<GroupPanelProps> = ({ group, isLoading, isError }) => {

  const dispatch = useAppDispatch();

  return (
    <div className="group-header regular-panel">
      <LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
        data={group}
      >
        <div className="avatar">
          <img src={process.env.REACT_APP_BACK_URL && group?.avatar 
            ? process.env.REACT_APP_BACK_URL + group.avatar 
            : 'https://i.ytimg.com/vi/QPVZdoZzXNQ/maxresdefault.jpg'} 
            alt="AVATAR_GROUP" 
          />
          <button 
            className="green change-avatar"
            onClick={() => dispatch(setWindow({window: WindowTypes.LOAD_GROUP_AVATAR}))}
          >
            Change Avatar
          </button>
        </div>
        <div className="header-right">
          <h3>{group?.name}</h3>
          <SubscribePanel group={group} />
        </div>
      </LoadErrorHandler>
    </div>
  )
}