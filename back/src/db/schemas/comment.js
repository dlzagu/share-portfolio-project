import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    ownerUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    writerUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
