import { Comment, CommentsStructure } from "..";

function findUpperCommentId(comment: Comment, comments: Comment[]): number | undefined {
  if (comment.responseToCommentId) {
    const responseToComment = comments.find(_comment => _comment.id == comment.responseToCommentId);
    if (!responseToComment) {
      return undefined;
    }
    if (!responseToComment.responseToCommentId) {
      return responseToComment.id
    }
    return findUpperCommentId(responseToComment, comments);
  } else {
    return undefined;
  }
}

function getCommentsStructure(comments: Comment[]): CommentsStructure {
  let commentsStructure: CommentsStructure = [];
  for (let comment of comments) {
    if (!comment.responseToCommentId) {
      commentsStructure.push({...comment, innerComments: []});
    }
  }

  for (let commentStructure of commentsStructure) {
    for (let comment of comments) {
      const upperCommentId = findUpperCommentId(comment, comments);
      if (!upperCommentId || upperCommentId !== commentStructure.id) {
        continue;
      }
      if (upperCommentId === commentStructure.id) {
        commentStructure.innerComments.push(comment);
      }
    }
  }

  return commentsStructure;
}

export const CommentsHelpers = {
  getCommentsStructure,
}