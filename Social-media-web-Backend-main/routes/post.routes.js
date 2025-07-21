const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.Controller');
const authMiddleware = require('../middleware/auth.middleware');
const uploadMiddleware = require('../middleware/upload.middleware');

// Create a new post (with optional image)
router.post(
  '/',
  authMiddleware,
  uploadMiddleware.single('image'),
  postController.createPost
);

// Get all posts (with pagination)
router.get('/', postController.getAllPosts);

// Get posts by specific user
router.get('/user/:userId',(req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
},postController.getUserPosts);

// Get single post by ID
router.get('/:id', postController.getPostById);

// Update a post
router.put(
  '/:id',
  authMiddleware,
  uploadMiddleware.single('image'),
  postController.updatePost
);

// Delete a post
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;

