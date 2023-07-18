import mongoose, { Schema } from "mongoose";
import {
  ACTIVITY_TYPE,
  IActivity,
} from "../../constants/interfaces/models.interface";
import Post from "./posts.model";
import User from "./users.model";

const CommentActionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  type: {
    type: Schema.Types.String,
    required: true,
    enum: [ACTIVITY_TYPE.COMMENT, ACTIVITY_TYPE.LIKE],
  },
  user_id: { type: Schema.Types.ObjectId , ref: User},
  content: { type: Schema.Types.String }
});

const ActivitySchema: Schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    post_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Post,
    },
    type: {
      type: Schema.Types.String,
      required: true,
      enum: [ACTIVITY_TYPE.COMMENT, ACTIVITY_TYPE.LIKE],
    },
    content: {
      type: Schema.Types.String,
    },
    comment_action: { type: CommentActionSchema },
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

const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);

export default Activity;
