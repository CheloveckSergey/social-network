import { FC } from "react"
import { Author } from "../model";
import { getImageSrc } from "../../../shared/service/images";
import './styles.scss';

interface ACCard {
  author: Author,
  createdAt: string,
}

export const AuthorCreationCard: FC<ACCard> = ({ author, createdAt }) => {

  return (
    <div className="author-creation-card">
      <img src={getImageSrc(author.avatar)} alt="IMG" />
      <div>
        <h3 className="title">{author.name}</h3>
        <p className="extra">{createdAt}</p>
      </div>
    </div>
  )
}