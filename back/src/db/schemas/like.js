import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const LikeSchema = new Schema(
  {
    // 좋아요를 누른 user의 ObjectId (loginUser)
    currentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // 좋아요를 받은 user의 ObjectId (portfolioOwnerUSer)
    ownerUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
