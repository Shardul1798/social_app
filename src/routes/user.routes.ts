import { Router } from "express";
import {
  CREATE_POST,
  LOGIN,
  REGISTER,
  VIEW_POST_DETAILS,
  VIEW_PROFILE,
} from "../constants/routes";
import userController from "../controller/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import validateBody from "../middlewares/validate-body.middleware";

class UserRoutes {
  public route: Router;
  constructor() {
    this.route = Router();
  }

  loadUserRoutes() {
    this.route.post(
      LOGIN,
      authMiddleware.checkBasicAuthAndValidate,
      validateBody.Login,
      userController.loginUser
    );
    this.route.post(
      REGISTER,
      authMiddleware.checkBasicAuthAndValidate,
      validateBody.Register,
      userController.registerUser
    );
    this.route.get('/view-profile/:id',authMiddleware.validateAuthToken ,userController.viewUserProfile);
    this.route.post(CREATE_POST, userController.createPost);
    this.route.post(VIEW_POST_DETAILS, userController.viewPostDetails);
    return this.route;
  }
}

export const userRoutes = new UserRoutes();
// export default userRoutes;
