import { MESSAGES } from "../common/messages";
import { STATUS } from "../common/status";
import userEntity from "../entity/user.entity";
import User from "../database/models/users.model";
import followerManagement from "../database/models/follower-management.model";
import {
  ACCOUNT_TYPE,
  FOLLOWER_STATUS,
} from "../common/interfaces/models.interface";
import postEntity from "../entity/post.entity";

class PostService {
  async CreatePost(body) {
    let responseObj: any = {};
    try {
      const payload: any = {
        user_id: body.currentUserId,
        media: body.media,
        likes: 0,
        comments: 0,
        caption: body?.caption,
        tagged: body?.tags,
        type: body.type,
      };
      body.caption ? (payload.caption = body.caption) : "";
      body.tags ? (payload.tags = body.tags) : "";

      const result = await postEntity.createNewPost(payload);
      if (result) {
        const incrPostCount = userEntity.IncrementCount(
          body.currentUserId,
          "POST"
        );
        if (!incrPostCount) {
          responseObj.message = "Internal Server Error";
          responseObj.statusCode = STATUS.SERVER_ERROR;
          return responseObj;
        }
        responseObj.statusCode = STATUS.SUCCESS;
        responseObj.message = MESSAGES.SUCCESS.CREATED_SUCCESS;
        responseObj.data = incrPostCount;
        return responseObj;
      }
    } catch (error) {
      console.error(error);
      responseObj.message = "Internal Server Error";
      responseObj.statusCode = STATUS.SERVER_ERROR;
      return responseObj;
    }
  }

  async getUserProfile(id) {
    let responseObj: any = {};
    try {
      const payload = { _id: id };
      const response = await userEntity.findSingleUser(payload, User);
      if (!response) {
        responseObj.statusCode = STATUS.SUCCESS;
        responseObj.message = MESSAGES.NOT_FOUND.USER_NOT_FOUND;
        return responseObj;
      }
      responseObj.statusCode = STATUS.SUCCESS;
      responseObj.message = MESSAGES.SUCCESS.DETAILS_SUCCESS;
      responseObj.data = response;
      return responseObj;
    } catch (error) {
      console.error(error);
      responseObj.message = "Internal Server Error";
      responseObj.statusCode = STATUS.SERVER_ERROR;
      return responseObj;
    }
  }

  async checkUserProfileStatus(id, receiversId) {
    let responseObj: any = {};
    try {
      const payload = { _id: id };
      const response = await userEntity.findSingleUser(payload, User);
      if (!response) {
        responseObj.statusCode = STATUS.SUCCESS;
        responseObj.message = MESSAGES.NOT_FOUND.USER_NOT_FOUND;
        return responseObj;
      }
      if (
        response &&
        response.account_privacy &&
        response.account_privacy == ACCOUNT_TYPE.PRIVATE
      ) {
        const followerPayload = {
          sendorId: id,
          receiversId: receiversId,
          status: FOLLOWER_STATUS.ACCEPTED,
        };
        const responseFollower = await userEntity.findSingleUser(
          followerPayload,
          followerManagement
        );
        if (!responseFollower) {
          responseObj.statusCode = STATUS.UNAUTHORIZED;
          responseObj.message = MESSAGES.ERROR.PRIVATE_USER;
          responseObj.data = null;
          return responseObj;
        }
      }
      responseObj.statusCode = STATUS.SUCCESS;
      responseObj.message = MESSAGES.SUCCESS.DETAILS_SUCCESS;
      return responseObj;
    } catch (error) {
      console.error(error);
      responseObj.message = "Internal Server Error";
      responseObj.statusCode = STATUS.SERVER_ERROR;
      return responseObj;
    }
  }
}

const postService = new PostService();
export default postService;
