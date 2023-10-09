import { FC } from "react"
import { Group } from "../../../entities/group"
import { OneUser } from "../../../entities/user"
import { getImageSrc } from "../../../shared/service/images"
import { useQuery } from "react-query"
import { AuthorApi } from "../../../entities/author/api"
import './styles.scss';
import { useAppDispatch } from "../../../app/store"
import { WindowTypes, setSubsWindow, setWindow } from "../../../widgets/modalWindow/model/redux"
import { useNavigate } from "react-router-dom"


interface SIInterface {
  sub: OneUser,
}
const SubItem: FC<SIInterface> = ({ sub }) => {

  const navigate = useNavigate();

  return (
    <div 
      className="sub-item"
      onClick={() => {
        navigate('/user/' + sub.id);
      }}
    >
      <img 
        src={getImageSrc(sub.avatar)} 
        alt="IMG"
        className="sub-img"
      />
      <h4 className="sub-login">{sub.login}</h4>
    </div>
  )
}

interface GSProps {
  group: Group | undefined
}
export const GroupSubs: FC<GSProps> = ({ group }) => {

  const { data, isLoading, isError } = useQuery(
    ['loadGroupSubs', group?.id],
    () => {
      if (group?.id) {
        return AuthorApi.getSubsByGroupId(group.id);
      }
    }
  )

  const dispatch = useAppDispatch();

  if (!group) {
    return (
      <div className="regular-panel">
        Fuck You!
      </div>
    )
  }

  return (
    <div className="regular-panel subs-panel">
      <h3
        className="header"
        onClick={() => dispatch(setSubsWindow({subAuthor: group.author}))}
      >
        Subs
      </h3>
      <div className="sub-list">
        {data?.slice(0, 6).map((sub, index) => <SubItem key={index} sub={sub} />)}
      </div>
    </div>
  )
}