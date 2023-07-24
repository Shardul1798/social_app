import mongoose, { Schema } from "mongoose";
import { IPosts } from "../../common/interfaces/models.interface";
import User from "./users.model";

const PostSchema: Schema = new Schema(
  {
    user_id: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    media: {
      type: Schema.Types.Array,
      required: true,
    },
    likes: {
      type: Schema.Types.Number,
      default: 0,
    },
    comments: {
      type: Schema.Types.Number,
      default: 0,
    },
    caption: Schema.Types.String,
    tagged: {
      type: Schema.Types.Array,
    },
    type: {
      type: Schema.Types.String,
      required: true,
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

const Post = mongoose.model<IPosts>("Posts", PostSchema);

export default Post;