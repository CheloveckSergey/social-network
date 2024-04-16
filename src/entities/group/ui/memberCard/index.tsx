import { FC } from "react";
import { GroupMember } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import './styles.scss';

interface MCProps {
  member: GroupMember,
  actions: React.ReactNode | React.ReactNode[],
}
export const MemberCard: FC<MCProps> = ({ member, actions }) => {

  return (
    <div
      className="member-card"
    >
      <img 
        className="avatar"
        src={Helpers.getImageSrc(member.user.avatar)} 
        alt="IMG" 
      />
      <div
        className="desc"
      >
        <h3 className="name">{member.user.login}</h3>
        <p className="extra">{member.gmType}</p>
      </div>
      <div
        className="actions"
      >
        {actions}
      </div>
    </div>
  )
}