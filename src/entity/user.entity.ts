import { Schema } from "mongoose";
import User from "../database/models/users.model";

class UserEntity {
  async findExistingUser(payload: any) {
    return await User.find({
      $or: [
        { username: payload.username },
        { email: payload.email },
        { phone: payload.phone },
      ],
    });
  }

  async findByMultipleIds(ids: Array<Schema.Types.ObjectId>) {
    // User.find({ _id: {$in: ids}});
  }

  async findSingleUser(payload: any, entityType) {
    return await entityType.findOne(payload);
  }

  async createDocument(body, entityType) {
    return await entityType.create(body);
  }

  async IncrementCount(userId, type) {
    switch (type) {
      case "POST":
        return await User.findOneAndUpdate(
          { _id: userId },
          { $inc: { posts: 1 } },
          { new: true }
        );
      case "FOLLOWER":
        return await User.findOneAndUpdate(
          { _id: userId },
          { $inc: { followers: 1 } },
          { new: true }
        );
      case "FOLLOWING":
        return await User.findOneAndUpdate(
          { _id: userId },
          { $inc: { following: 1 } },
          { new: true }
        );
    }
  }
}

const userEntity = new UserEntity();
export default userEntity;
