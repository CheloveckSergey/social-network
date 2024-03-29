import { FC } from "react";
import './styles.scss';
import { BsThreeDots } from "react-icons/bs";
import { OnePost } from "../../..";

interface EPProps {
  post: OnePost,
}

const ExtraPanel: FC<EPProps> = ({ post }) => {

  return (
    <div className="extra-post-panel extra-panel">
      <h4>It's not interesting</h4>
      <h4>Save</h4>
      <h4>Complain</h4>
      <h4>Notify about news</h4>
    </div>
  )
}

interface ESProps {
  post: OnePost,
}

export const ExtraSection: FC<ESProps> = ({ post }) => {

  return (
    <div className="post-extra-section">
      <button className="white">
        <BsThreeDots size={25}/>
      </button>
      <ExtraPanel post={post} />
    </div>
  )
}