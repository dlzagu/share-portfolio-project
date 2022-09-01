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

  static async update({ commentId, toUpdate }) {
    const filter = { _id: commentId };
    const update = toUpdate;
    const option = { returnOriginal: false };

    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedComment;
  }
  static async delete({ commentId }) {
    const ret = await CommentModel.findOneAndDelete({ _id: commentId });
    return ret;
  }
}

export { Comment };
