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

  static async findByUsers({ ownerUser }) {
    const comments = await CommentModel.find({ ownerUser })
      .sort("createdAt")
      .populate("writerUser", "email id name -_id");
    return comments;
  }
}

export { Comment };
