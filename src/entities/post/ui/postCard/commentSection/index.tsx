import { FC, useEffect, useState } from "react";
import './styles.scss';
import { User } from "../../../../user";
import { OnePost } from "../../..";
import { CommentsLib, CommentsUi, OneComment } from "../../../../comment";
import { CommentsActionsUi } from "../../../../../fetures/comments";
import Favourites from "../../../../../fetures/favourites";
import { OneCreation } from "../../../../creation";
import { PostCommentsWidget } from "../../../../../widgets/postComments";

interface CSProps {
  creation: OneCreation,
  renderCommentsWidget: (creation: OneCreation) => React.ReactNode | React.ReactNode[],
}
export const CommentSection: FC<CSProps> = ({ creation, renderCommentsWidget }) => {

  return (
    <div className="comments-section">
      {renderCommentsWidget(creation)}
    </div>
  )
}