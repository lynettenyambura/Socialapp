const express = require('express');
const router = express.Router();

// Create a new post
router.post('/', createPost);

// Get a specific post
router.get('/:postId', getPost);

// Delete a post
router.delete('/:postId', deletePost);

// Create a new post
function createPost(req, res) {
  // TODO: Implement code to create a new post
  
  // Return success message in the response
  res.json({ message: 'Post created successfully' });
}

// Get a specific post
function getPost(req, res) {
  // Get the postId from request parameters
  const { postId } = req.params;

  // TODO: Implement code to retrieve the specified post
  
  // Return the post data in the response
  res.json({ postId: postId, title: 'Sample Post' });
}

// Delete a post
function deletePost(req, res) {
  // Get the postId from request parameters
  const { postId } = req.params;

  // TODO: Implement code to delete the specified post
  
  // Return success message in the response
  res.json({ message: 'Post deleted successfully' });
}

module.exports = router;
