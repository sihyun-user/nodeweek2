const Post = require('../models/post');
const errorMsg = require('../utils/errorMsg');
const responseHandler = require('../utils/responseHandler');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Post.find();
    responseHandler.handleSuccess(res, allPosts);
  },
  async createPosts(req, res, body) {
    try {
      const data = JSON.parse(body);

      const newPost = await Post.create(
        {
          name: data.name,
          content: data.content
        }
      )

      responseHandler.handleSuccess(res, newPost);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.POST);
    };
  },
  async deleteAllPosts(req, res) {
    await Post.deleteMany();
    const allPosts = await Post.find();
    responseHandler.handleSuccess(res, allPosts);
  },
  async deletePosts(req, res) {
    try {
      const id = req.url.split('/').pop();
      const postData = await Post.find({ '_id': id });

      if (postData.length == 0) throw error
      
      await Post.findByIdAndDelete(id);

      const allPosts = await Post.find();

      responseHandler.handleSuccess(res, allPosts);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.DELETE);
    }
  },
  async updatePosts(req, res, body) {
    try {
      const data = JSON.parse(body);
      const id = req.url.split('/').pop();
      const postData = await Post.find({ '_id': id });

      if (postData.length == 0) throw error
      
      await Post.findByIdAndUpdate(id, {
        name: data.name,
        content: data.content
      });

      const updatePost = await Post.find({'_id': id })

      responseHandler.handleSuccess(res, updatePost);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.PATCH);
    };
  }
}

module.exports = posts;