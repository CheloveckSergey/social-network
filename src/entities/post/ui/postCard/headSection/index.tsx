import { FC } from "react";
import './styles.scss';
import { AuthorUi, OneAuthor } from "../../../../author";

interface HSProps {
  author: OneAuthor,
  createdAt: string,
}
export const HeadSection: FC<HSProps> = ({ author, createdAt }) => {
  //Не определяется тип автора
  return (
    <div className="post-head">
      <AuthorUi.AuthorCard 
        author={author}
        createdAt={createdAt}
      />
    </div>
  )
}