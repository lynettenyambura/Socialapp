const express = require('express');
const router = express.Router();

// Get a user
router.get('/:userId', getUser);

// Follow a user
router.post('/:userId/follow/:targetUserId', followUser);

// Unfollow a user
router.post('/:userId/unfollow/:targetUserId', unfollowUser);

// Update a user
router.put('/:userId', updateUser);

// Delete a user (soft delete)
router.delete('/:userId', deleteUser);

// Get user profile
router.get('/:userId/profile', getUserProfile);

// Update user profile
router.put('/:userId/profile', updateProfile);

// Get a user
function getUser(req, res) {
  // Get the userId from request parameters
  const { userId } = req.params;

  // TODO: Implement code to retrieve the specified user
  
  // Return the user data in the response
  res.json({ userId: userId, name: 'John Doe' });
}

// Follow a user
function followUser(req, res) {
  // Get the userId and targetUserId from request parameters
  const { userId, targetUserId } = req.params;

  // TODO: Implement code to follow the specified user
  
  // Return success message in the response
  res.json(`User ${userId} is now following user ${targetUserId}`);
}

// Unfollow a user
function unfollowUser(req, res) {
  // Get the userId and targetUserId from request parameters
  const { userId, targetUserId } = req.params;

  // TODO: Implement code to unfollow the specified user
  
  // Return success message in the response
  res.json(`User ${userId} has unfollowed user ${targetUserId}`);
}

// Update a user
function updateUser(req, res) {
  // Get the userId from request parameters
  const { userId } = req.params;

  // TODO: Implement code to update the specified user
  
  // Return success message in the response
  res.json({ message: `User ${userId} has been updated` });
}

// Delete a user (soft delete)
function deleteUser(req, res) {
  // Get the userId from request parameters
  const { userId } = req.params;

  // TODO: Implement code to delete the specified user
  
  // Return success message in the response
  res.json({ message: `User ${userId} has been deleted (soft delete)` });
}

// Get user profile
function getUserProfile(req, res) {
  // Get the userId from request parameters
  const { userId } = req.params;

  // TODO: Implement code to retrieve the user's profile
  
  // Return the profile data in the response
  res.json({ userId: userId, fullName: 'John Doe', bio: 'Web Developer' });
}

// Update user profile
function updateProfile(req, res) {
  // Get the userId from request parameters
  const { userId } = req.params;

  // TODO: Implement code to update the user's profile
  
  // Return success message in the response
  res.json({ message: `Profile for User ${userId} has been updated` });
}

module.exports = router;
