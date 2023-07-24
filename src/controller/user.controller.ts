import { Request, Response } from "express";
import { STATUS } from "../common/status";
import userService from "../services/user.service";

class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const result = await userService.SignupNewUser(req.body);
      if (result) {
        return res.status(result.statusCode).json({ message: result.message });
      }
    } catch (error) {
      console.error("Something Went Wrong!", error);
      res.status(500).json({ message: "Something Went Wrong!" });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const payload = {
        username: req.body.username,
        password: req.body.password,
      };
      const login: any = await userService.LoginUser(payload);
      if (!login) {
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      return res
        .status(login.statusCode)
        .json({ message: login.message, data: login?.data });
    } catch (error) {
      console.error("Something Went Wrong!", error);
      res.status(500).json({ message: "Something Went Wrong!" });
    }
  }

  async viewUserProfile(req: Request, res: Response) {
    try {
      if(req.params.id !== req.body.currentUserId) {
        const response = await userService.checkUserProfileStatus(req.params.id, req.body.currentUserId);
        if(response && response.statusCode == STATUS.UNAUTHORIZED) {
          return res.status(response.statusCode).json({message: response.message});
        }
      }
      const response = await userService.getUserProfile(req.params.id);
      if (!response) {
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      return res
        .status(response.statusCode)
        .json({ message: response.message, data: response?.data });
    } catch (error) {
      console.error("Something Went Wrong!", error);
      res.status(500).json({ message: "Something Went Wrong!" });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      console.log(req.body);
    } catch (error) {
      console.error("Something Went Wrong!", error);
      res.status(500).json({ message: "Something Went Wrong!" });
    }
  }

  async viewPostDetails(req: Request, res: Response) {
    try {
      console.log(req.body);
    } catch (error) {
      console.error("Something Went Wrong!", error);
      res.status(500).json({ message: "Something Went Wrong!" });
    }
  }
}

const userController = new UserController();
export default userController;
