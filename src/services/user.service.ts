import { MESSAGES } from "../constants/messages";
import { STATUS } from "../constants/status";
import userEntity from "../entity/user.entity";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middlewares/auth.middleware";
import User from "../database/models/users.model";
import followerManagement from "../database/models/follower-management.model";
import Session from "../database/models/session.model";
import { ACCOUNT_TYPE, FOLLOWER_STATUS } from "../constants/interfaces/models.interface";

class UserService {
  async LoginUser(payload) {
    let responseobject: any = {};
    try {
      let checkUser = await userEntity.findSingleUser(
        {
          username: payload.username,
        },
        User
      );
      if (!checkUser) {
        responseobject.statusCode = STATUS.NOT_FOUND;
        responseobject.message = MESSAGES.NOT_FOUND.USER_NOT_FOUND;
        return responseobject;
      }
      const matchPassword = await bcrypt.compare(
        payload.password,
        checkUser.password
      );
      if (!matchPassword) {
        responseobject.statusCode = STATUS.UNAUTHORIZED;
        responseobject.message = MESSAGES.ERROR.INCORRECT_PASSWORD;
        return responseobject;
      }
      const createPayload = {
        user_id: checkUser._id,
        expiryTime: Date.now() + 60 * 60 * 24,
        deviceType: 'POSTMAN',
        deviceId: "1234",
        deviceIP: "192.0.0.1"

      };
      const sessionCreate: any = await userEntity.createDocument(
        createPayload,
        Session
      );
      if (!sessionCreate) {
        responseobject.statusCode = STATUS.SERVER_ERROR;
        responseobject.message = MESSAGES.ERROR.INTERNAL_SERVER_ERROR;
        return responseobject;
      }
      let token = await authMiddleware.generateAuthToken(
        checkUser._id,
        sessionCreate._id
      );
      responseobject.statusCode = STATUS.SUCCESS;
      responseobject.message = MESSAGES.SUCCESS.DETAILS_SUCCESS;
      responseobject.data = [{ accessToken: token }];
      return responseobject;
    } catch (error) {
      console.error(error);
      responseobject.message = "Internal Server Error";
      responseobject.statusCode = STATUS.SERVER_ERROR;
      return responseobject;
    }
  }

  async SignupNewUser(body) {
    let responseObj: any = {};
    try {
      const payload: any = {
        username: body.username,
        name: body.name,
        email: body.email,
        phone: body.phone,
        countryCode: 91,
        password: body.password,
        account_privacy: body.account_privacy,
        gender: body.gender,
        posts: 0,
        followers: 0,
        following: 0,
        time_spent: 0,
        notifications_count: 0,
        isVerified: false,
        unread_notifications: 0,
      };

      payload.dob = new Date(body.dob);

      //Check for Username, Email & Phone
      const findUser = await userEntity.findExistingUser({
        username: payload.username,
        email: payload.email,
        phone: payload.phone
      });
      if (findUser && findUser.length) {
        responseObj.statusCode = STATUS.SUCCESS;
        responseObj.message = MESSAGES.ALREADY_EXIST.USER;
        return responseObj;
      }

      const hashedPassword = await bcrypt.hash(payload.password, 10);
      if (!hashedPassword) {
        responseObj.statusCode = STATUS.SERVER_ERROR;
        responseObj.message = MESSAGES.ERROR.INTERNAL_SERVER_ERROR;
        return responseObj;
      }
      payload.password = hashedPassword;
      const result = await userEntity.createDocument(payload, User);
      if (result) {
        console.log(result);
        responseObj.statusCode = STATUS.SUCCESS;
        responseObj.message = MESSAGES.SUCCESS.CREATED_SUCCESS;
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
    try{
      const payload = { _id: id };
      const response = await userEntity.findSingleUser(payload, User);
      if (!response) {
        responseObj.statusCode = STATUS.SUCCESS;
        responseObj.message = MESSAGES.NOT_FOUND.USER_NOT_FOUND;
        return responseObj;
      }
      if(response && response.account_privacy && response.account_privacy == ACCOUNT_TYPE.PRIVATE) {
        const followerPayload = { sendorId: id, receiversId: receiversId, status: FOLLOWER_STATUS.ACCEPTED };
        const responseFollower = await userEntity.findSingleUser(followerPayload, followerManagement);
        if(!responseFollower) {
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

const userService = new UserService();
export default userService;
