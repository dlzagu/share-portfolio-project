import { CommentModel } from "../schemas/comment";

class Comment {
  static async create({ writerUser, ownerUser, comment }) {
    const createdNewComment = await CommentModel.create({
      writerUser,
      ownerUser,
      comment,
    });
    return createdNewComment;
  }

  static async findByUser({ writerUser, ownerUser }) {
    const comments = await CommentModel.findOne({
      $and: [{ writerUser }, { ownerUser }],
    }).populate("writerUser", "email id name -_id");
    return comments;
  }
}

export { Comment };
