import cors from "cors";
import express, { Express } from "express";
import mongoose from "mongoose";
import Activity from "./src/database/models/activity.model";
import FollowerManagement from "./src/database/models/follower-management.model";
import Post from "./src/database/models/posts.model";
import SavedPost from "./src/database/models/saved-post.model";
import Session from "./src/database/models/session.model";
import User from "./src/database/models/users.model";
import dotenv from "dotenv";
import { serve, setup } from "swagger-ui-express";
import appRoutes from "./src/routes/app.routes";
import swaggerJSDoc from "swagger-jsdoc";
import { SWAGGER_OPTIONS } from "./src/common/constant";

dotenv.config();
class App {
  private app: Express = express();
  private port: number = 6002;
  private hostname = "127.0.0.1";

  constructor() {
    this.startApp();
  }

  private startApp() {
    this.app = express();
    this.loadGlobalMiddlewares();
    this.connectToDatabase();
    this.loadRoutes();
    this.initialiseServer();
  }

  private loadGlobalMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    const socialAppAPISpecs = swaggerJSDoc(SWAGGER_OPTIONS);
    this.app.use(`/api-docs`, serve, setup(socialAppAPISpecs));
  }

  private initialiseServer() {
    this.app.listen(this.port, this.hostname, () => {
      console.log(
        `[server]: The server is running at http://${this.hostname}:${this.port}`
      );
    });
  }

  private loadRoutes() {
    this.app.use("/social-app", appRoutes.loadRoutes());
  }

  private async connectToDatabase() {
    try {
      await mongoose.connect("mongodb://localhost:27017/social_app", {});
      User.createCollection();
      Post.createCollection();
      Activity.createCollection();
      FollowerManagement.createCollection();
      SavedPost.createCollection();
      Session.createCollection();
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
}

const bootstrap = new App();
