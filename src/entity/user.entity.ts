import * as mongoose from "mongoose";
import followerManagement from "../database/models/follower-management.model";
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

  async findSingleUser(payload: any, entityType) {
    return await entityType.findOne(payload);
  }

  async createDocument(body, entityType) {
    return await entityType.create(body);
  }

  async followersDetails(id) {
    const details = await followerManagement.aggregate([
      {
        $match: {
          recieversId: { $eq: new mongoose.Types.ObjectId(id) },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sendersId",
          foreignField: "_id",
          as: "FollowerData",
        },
      },
      {
        $unwind: "$FollowerData",
      },
      {
        $project: {
          sendersId: 1,
          FollowerData: { username: 1 },
        },
      },
    ]);
    return details;
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
