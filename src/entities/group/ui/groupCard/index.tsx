import { FC } from "react";
import { OneGroup } from "../../model";
import './styles.scss';
import { Helpers } from "../../../../shared/helpers";
import { useNavigate } from "react-router-dom";

interface GCProps {
  group: OneGroup,
}
export const GroupCard: FC<GCProps> = ({ group }) => {

  const navigate = useNavigate();

  return (
    <div 
      className="group-card"
    >
      <img 
        className="avatar"
        src={Helpers.getImageSrc(group.avatar)}
        alt='IMG'
      />
      <div
        className="description"
      >
        <h4 
          className="name"
          onClick={() => navigate('/group/' + group.id)}
        >
          {group.name}
        </h4>
        <p className="extra">{group.author.subsNumber}</p>
      </div>
    </div>
  )
}