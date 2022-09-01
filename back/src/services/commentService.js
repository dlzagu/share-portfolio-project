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

  static async getComments({ ownerUserId }) {
    const ownerUser = await User.findById({ user_id: ownerUserId });

    if (!ownerUser) {
      const errorMessage =
        "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const comments = await Comment.findByUsers({ ownerUser });
    console.log("comments", comments);
    return comments;
  }
}

export { CommentService };
