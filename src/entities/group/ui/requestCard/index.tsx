import { FC } from "react"
import { MembershipRequest } from "../../model"
import { Helpers } from "../../../../shared/helpers"
import './styles.scss';

interface Feature {
  body: string,
  mutate: () => void,
  isLoading: boolean,
  isError: boolean,
}

interface RCProps {
  request: MembershipRequest,
  actions: React.ReactNode[],
}
export const RequestCard: FC<RCProps> = ({ request, actions }) => {

  return (
    <div className="request-card">
      <img
        className="avatar"
        src={Helpers.getImageSrc(request.user.avatar)} 
        alt="IMG" 
      />
      <div className="desc">
        <h3 className="name">{request.user.login}</h3>
      </div>
      <div
        className="features"
      >
        {actions}
      </div>
    </div>
  )
}