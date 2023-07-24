import mongoose, { Schema } from "mongoose";
import { ISession } from "../../common/interfaces/models.interface";
import User from "./users.model";

const SessionSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    expiryTime: {
      type: Date,
    },
    deviceType: {
      type: Schema.Types.String,
      required: true,
    },
    deviceId: {
      type: Schema.Types.String,
      required: true,
    },
    deviceIP: {
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

const Session = mongoose.model<ISession>("Session", SessionSchema);

export default Session;