import { FC } from "react"
import { useQuery } from "react-query"
import { GroupApi } from "../../../entities/group/api"
import { Link } from "react-router-dom";
import { Group } from "../../../entities/group";

interface GIProps {
  group: Group,
}

const GroupItem: FC<GIProps> = ({ group }) => {

  return (
    <div className='group-item'>
      <img 
        src={group.avatar && process.env.REACT_APP_BACK_URL 
          ? process.env.REACT_APP_BACK_URL + group.avatar 
          : 'https://assets.faceit-cdn.net/hubs/avatar/fcdb61a2-09e7-4fd4-a6c5-d5affccbd13b_1609434381537.jpg'} 
        alt="GROUP_IMG" 
      />
      <h3 className="group-name">
        <Link to={`${group.name}`} >
          {group.name}
        </Link>
      </h3>
    </div>
  )
}

export const GroupList: FC = ({  }) => {
  const { data, isLoading, isError } = useQuery(
    'getAllGroups',
    () => GroupApi.getAllGroups()
  )

  return (
    <div className='group-list'>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : !data ? (
        <div>Something went wrong...</div>
      ) : (
        <div>
          {data.map((group, index) => <GroupItem key={index} group={group} />)}
        </div>
      )}
    </div>
  )
}