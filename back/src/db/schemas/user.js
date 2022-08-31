import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    // 좋아요 수를 받는 likeCount
    likeCount: {
      type: Number,
      required: false,
      default: 0,
    },
    liked: [new mongoose.Schema({ name: String })],
    // 현재 좋아요 버튼이 눌린 상태이거나 눌리지 않은 상태를 표시하는 status
    status: {
      type: Boolean,
      required: false,
      default: false,
    },

    bookmarks: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
