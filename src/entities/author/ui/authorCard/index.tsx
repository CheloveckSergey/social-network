import { FC } from "react"
import { Author } from "../../model"
import { Helpers } from "../../../../shared/helpers"
import './styles.scss';
import { MyDate } from "../../../../shared/types";

interface ACProps {
  author: Author,
  createdAt: string,
}

export const AuthorCard: FC<ACProps> = ({ author, createdAt }) => {

  const myDate = new MyDate(createdAt);
  const date = myDate.getStringDate();
  const time = myDate.getStringTime();

  return (
    <div className="author-card">
      <img src={Helpers.getImageSrc(author.avatar)} alt="IMG" />
      <div>
        <h3 className="title">{author.name}</h3>
        <p className="extra">{date + ' ' + time}</p>
      </div>
    </div>
  )
}