const express = require('express');
const router = express.Router();

// Like a post
router.post('/like/:postId/:userId', likePost);

// Unlike a post
router.delete('/unlike/:postId/:userId', unlikePost);

// Like a post
function likePost(req, res) {
  // Get the postId and userId from request parameters
  const { postId, userId } = req.params;

  // TODO: Implement code to like the post
  
  // Return success message in the response
  res.json(`User ${userId} has liked post ${postId}`);
}

// Unlike a post
function unlikePost(req, res) {
  // Get the postId and userId from request parameters
  const { postId, userId } = req.params;

  // TODO: Implement code to unlike the post
  
  // Return success message in the response
  res.json(`User ${userId} has unliked post ${postId}`);
}

module.exports = router;
