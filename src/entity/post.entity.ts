import Post from "../database/models/posts.model";

class PostEntity {
  async findExistingPost(payload: any) {
    return await Post.find(payload);
  }

  async createNewPost(payload: any) {
    return await Post.create(payload);
  }
}

const postEntity = new PostEntity();
export default postEntity;
