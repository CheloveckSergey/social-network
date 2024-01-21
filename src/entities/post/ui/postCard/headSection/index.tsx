import { FC } from "react";
import './styles.scss';
import { Helpers } from "../../../../../shared/helpers";
import { OnePost } from "../../..";
import { useNavigate } from "react-router-dom";
import { AuthorUi } from "../../../../author";

interface HSProps {
  post: OnePost,
}
export const HeadSection: FC<HSProps> = ({ post }) => {
  //Не определяется тип автора
  return (
    <div className="post-head">
      <AuthorUi.AuthorCard 
        author={post.creation.author}
        createdAt={post.creation.createdAt}
      />
    </div>
  )
}