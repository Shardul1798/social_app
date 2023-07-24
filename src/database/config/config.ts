import mongoose from 'mongoose';
import Activity from '../models/activity.model';
import FollowerManagement from '../models/follower-management.model';
import Post from '../models/posts.model';
import SavedPost from '../models/saved-post.model';
import Session from '../models/session.model';
import User from '../models/users.model';

export async function connectToDatabase(uri:string) {
  try {
    await mongoose.connect('mongodb://localhost:27017/social_app', {
    });
    User.createCollection();
    Post.createCollection(),
    Activity.createCollection();
    FollowerManagement.createCollection();
    SavedPost.createCollection();
    Session.createCollection();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}