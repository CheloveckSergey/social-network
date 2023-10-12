import { FC } from "react";
import { User, UserApi } from "../../../entities/user";
import { useQuery } from "react-query";
import './styles.scss';
import { DescApi } from "../../../entities/description";
import { FiEdit2 } from "react-icons/fi";
import { useAppDispatch } from "../../../app/store";
import { WindowTypes, setWindow } from "../../../widgets/modalWindow/model/redux";

interface InfoProps {
  user: User | undefined,
}

export const Info: FC<InfoProps> = ({ user }) => {

  const { data } = useQuery(
    ['getUserDesc', user?.id],
    () => {
      if (user?.id) {
        return DescApi.getDesc();
      }
    }
  )

  const dispatch = useAppDispatch();

  return (
    <div className="info regular-panel">
      <div>
        <div className="just-cause">
          <h2>{user?.login}</h2>
          <button
            className="edit-button white"
            onClick={() => dispatch(setWindow({window: WindowTypes.CHANGE_DESC_WINDOW}))}
          >
            <FiEdit2 size={18} />
          </button>
        </div>
        {data?.quote && <p>
          {data?.quote}
        </p>}
      </div>
      <hr/>
      <div>
        {data?.date && <div className="string-info">
          <p className="extra-normal">Birth Date</p>
          <p>{data?.date}</p>
        </div>}
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