import { Request, Response } from "express";
import postService from "../services/post.service";

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const result = await postService.CreatePost(req.body);
      if (result) {
        return res.status(result.statusCode).json({ message: result.message });
      }
    } catch (error) {
      console.error("Something Went Wrong!", error);
      res.status(500).json({ message: "Something Went Wrong!" });
    }
  }

  // async viewUserProfile(req: Request, res: Response) {
  //   try {
  //     if(req.params.id !== req.body.currentUserId) {
  //       const response = await userService.checkUserProfileStatus(req.params.id, req.body.currentUserId);
  //       if(response && response.statusCode == STATUS.UNAUTHORIZED) {
  //         return res.status(response.statusCode).json({message: response.message});
  //       }
  //     }
  //     const response = await userService.getUserProfile(req.params.id);
  //     if (!response) {
  //       return res.status(500).json({ message: "Something Went Wrong!" });
  //     }
  //     return res
  //       .status(response.statusCode)
  //       .json({ message: response.message, data: response?.data });
  //   } catch (error) {
  //     console.error("Something Went Wrong!", error);
  //     res.status(500).json({ message: "Something Went Wrong!" });
  //   }
  // }

  // async viewPostDetails(req: Request, res: Response) {
  //   try {
  //     console.log(req.body);
  //   } catch (error) {
  //     console.error("Something Went Wrong!", error);
  //     res.status(500).json({ message: "Something Went Wrong!" });
  //   }
  // }
}

const postController = new PostController();
export default postController;
