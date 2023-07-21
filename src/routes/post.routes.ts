import { Router } from "express";
import postController from "../controller/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import validateBody from "../middlewares/validate-body.middleware";

class PostRoutes {
  private route: Router;
  constructor() {
    this.route = Router();
  }

  loadPostRoutes() {
    this.route.post(
      "/create",
      authMiddleware.validateAuthToken,
      validateBody.CreatePost,
      postController.createPost
    );
    return this.route;
  }
}

const postRoutes = new PostRoutes();
export default postRoutes;
