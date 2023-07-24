import { Schema } from "mongoose";

export enum ACCOUNT_TYPE {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum POST_TYPE {
  STORY = "STORY",
  HIGHLIGHT = "HIGHLIGHT",
  REEL = "REEL",
  POST = "POST",
}

export enum FOLLOWER_STATUS {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum ACTIVITY_TYPE {
  LIKE = "LIKE",
  COMMENT = "COMMENT",
}

//Embedded Documents interface
export interface ICommentAction {
  type: ACTIVITY_TYPE;
  user_id: string;
}

//Documents Interface
export interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  name: string;
  email: string;
  phone: number;
  country_code: string;
  password: string;
  dob: Date;
  account_privacy: ACCOUNT_TYPE;
  posts: number;
  followers: number;
  followings: number;
  time_spent: number;
  notifications_count: number;
  last_password_changed: Date;
  profile_pic: string;
  is_verified: boolean;
  created_at: Date;
  unread_notification: string;
  updatedAt: Date;
}

export interface IPosts {
  _id: Schema.Types.ObjectId;
  media: any;
  likes: number;
  comments: number;
  createdAt: Date;
  caption: string;
  tagged: any;
  type: POST_TYPE;
}

export interface IFollowerManagement {
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  status: FOLLOWER_STATUS;
}

export interface IActivity {
  post_id: Schema.Types.ObjectId;
  type: ACTIVITY_TYPE;
  content: string;
  comment_action: ICommentAction;
}

export interface ISession {
  _id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  expiry_time: Date;
  created_at: Date;
  device_type: string;
  device_id: string;
  device_ip: string;
}

export interface ISavedPost {
  _id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  post_id: Schema.Types.ObjectId;
}