import mongoose, { Schema } from "mongoose";
import { ISavedPost } from "../../constants/interfaces/models.interface";
import Post from "./posts.model";
import User from "./users.model";

const SavedPostSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: Post,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const SavedPost = mongoose.model<ISavedPost>("SavedPost", SavedPostSchema);

export default SavedPost;
