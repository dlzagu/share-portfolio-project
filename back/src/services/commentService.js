import { User } from "../db";
import { Comment } from "../db/models/Comment";

class CommentService {
  //신규 댓글 추가
  static async addComment({ ownerUserId, writerUserId, comment }) {
    const writerUser = await User.findById({ user_id: writerUserId });
    const ownerUser = await User.findById({ user_id: ownerUserId });
    const createdNewComment = await Comment.create({
      writerUser,
      ownerUser,
      comment,
    });
    return createdNewComment;
  }

  //특정 쿼리의 댓글 내역 반환용
  static async getComments(query) {
    const comments = await Comment.findByQuery(query);
    if (comments.length == 0) {
      const errorMessage = "해당 유저의 댓글이 존재하지 않습니다.";
      return { errorMessage };
    }

    return comments;
  }
}

export { CommentService };
