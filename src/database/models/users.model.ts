import mongoose, { Schema, Document } from "mongoose";
import { ACCOUNT_TYPE, IUser } from "../../constants/interfaces/models.interface";

const UserSchema: Schema = new Schema(
  {
    _id: {
        type: Schema.Types.ObjectId
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    countryCode: {
      type: String,
      required: true,
      default: "+91",
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    account_privacy: {
      type: String,
      required: true,
      enum: [
        ACCOUNT_TYPE.PRIVATE,
        ACCOUNT_TYPE.PUBLIC
      ]
    },
    posts: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    time_spent: {
      type: Number,
      default: 0,
    },
    notifications_count: {
      type: Number,
      default: 0,
    },
    last_password_changed: {
      type: Date,
    },
    profile_pic: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    unread_notification: {
      type: Number,
      default: 0,
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

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
