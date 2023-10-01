import { FC } from "react";
import { OneUser, UserApi } from "../../../entities/user";
import './styles.scss';
import { useQuery } from "react-query";

interface InfoProps {
  user: OneUser | undefined,
}

export const Info: FC<InfoProps> = ({ user }) => {

  const { data } = useQuery(
    ['getUserDesc', user?.id],
    () => {
      if (user?.id) {
        return UserApi.getUserDesc(user.id);
      }
    }
  )

  return (
    <div className="info regular-panel">
      <div>
        <h2>{user?.login}</h2>
        {data?.quote && <p>
          {data?.quote}
        </p>}
      </div>
      <hr/>
      <div>
        <div className="string-info">
          <p className="extra-normal">Birth Date</p>
          <p>{data?.data}</p>
        </div>
        {data?.city && <div className="string-info">
          <p className="extra-normal">City</p>
          <p>{data?.city}</p>
        </div>}
        {data?.telephone && <div className="string-info">
          <p className="extra-normal">Telephone</p>
          <p>{data?.telephone}</p>
        </div>}
        <div className="add-info">
          <button className="show-more">
            Show additional information
          </button>
        </div>
      </div>
    </div>
  )
}