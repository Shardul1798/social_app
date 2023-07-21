import mongoose, { Schema } from "mongoose";
import { FOLLOWER_STATUS, IFollowerManagement } from "../../constants/interfaces/models.interface";
import User from "./users.model";

const FollowerManagementSchema: Schema = new Schema(
  {
    sendorId: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    receiversId: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    status: {
        type: Schema.Types.String,
        enum: [
            FOLLOWER_STATUS.ACCEPTED,
            FOLLOWER_STATUS.PENDING,
            FOLLOWER_STATUS.REJECTED
        ]
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

const followerManagement = mongoose.model<IFollowerManagement>("FollowerManagement", FollowerManagementSchema);

export default followerManagement;