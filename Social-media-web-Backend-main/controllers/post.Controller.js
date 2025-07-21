const database = require('../configs/db.config');
const Post = require('../models/Post.model');

// @route   GET /api/v1/posts/
// @desc    Get all posts (with pagination)
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const [rows] = await database.execute(
      'SELECT p.*, u.username, u.profile_picture FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   GET /api/v1/posts/:id
// @desc    Get single post by ID
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// @route   POST /api/v1/posts
// @desc    Create a new post with optional image
// @access  Private
const createPost = async (req, res) => {
  try {
    const imagePath = req.file 
      ? `/uploads/${req.file.filename}` 
      : null;
    const postId = await Post.create({
      user_id: req.user.id,
      content: req.body.content,
      image_url: imagePath
    });
    // Get the created post with user information
    const createdPost = await Post.findById(postId);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: error.message });
  }
};
// @route   DELETE /api/v1/posts/:id
// @desc    Delete a post by ID if owned by the current user
// @access  Private
const deletePost = async (req, res) => {
  try {
    await Post.delete(req.params.id, req.user.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// @route   GET /api/v1/posts/user/:userId
// @desc    Get all posts created by a specific user
// @access  Public
const getUserPosts = async (req, res) => {
  try {
    console.log('Fetching posts for user:', req.params.userId); // Debug log
    
    // Add input validation
    if (!req.params.userId || isNaN(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const posts = await Post.findByUserId(req.params.userId);
    
    if (!posts) {
      return res.status(404).json({ error: 'No posts found' });
    }

    res.json(posts);
  } catch (error) {
    console.error('Post fetch error:', error); // Detailed logging
    res.status(500).json({ 
      error: 'Failed to fetch posts',
      details: error.message // Include actual error
    });
  }
};

// @route   PUT /api/v1/posts/:id
// @desc    Update a post’s content or image if owned by the current user
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (existingPost.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    let image_url = existingPost.image_url;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    await Post.update(id, { 
      content: content || existingPost.content,
      image_url
    });

    const updatedPost = await Post.findById(id);
    res.json(updatedPost);

  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
};

module.exports = { 
  createPost, 
  getUserPosts, 
  deletePost, 
  updatePost,
  getAllPosts,
  getPostById
};
