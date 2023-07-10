const db = require('../config.js');

// Get a user
const getUser = (req, res) => {
  // Get the userId from request parameters
  const { userId } = req.params;

  // TODO: Implement code to fetch the user from the database using userId
  db.then(pool => {
    const query = `SELECT * FROM users WHERE id = @userId`;
    pool
      .request()
      .input('userId', userId)
      .query(query)
      .then(result => {
        if (result.recordset.length === 0) {
          return res.status(404).json('User not found');
        }
        const user = result.recordset[0];
        // Return the user data in the response
        return res.json(user);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};

// Follow a user
const followUser = (req, res) => {
  const followerId = req.params.userId;
  const followedId = req.params.targetUserId;

  console.log('followerId:', followerId);
  console.log('followedId:', followedId);

  db.then((pool) => {
    const query = `INSERT INTO relationships (follower_UserID, followed_userID) VALUES (@followerId, @followedId)`;
    pool
      .request()
      .input('followerId', followerId)
      .input('followedId', followedId)
      .query(query)
      .then(() => {
        return res.json(`User ${followerId} is now following user ${followedId}`);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

// Unfollow a user
const unfollowUser = (req, res) => {
  const followerId = req.params.userId;
  const followedId = req.params.targetUserId;

  db.then((pool) => {
    const query = `DELETE FROM relationships WHERE follower_UserID = @followerId AND followed_userID = @followedId`;
    pool
      .request()
      .input('followerId', followerId)
      .input('followedId', followedId)
      .query(query)
      .then(() => {
        return res.json(`User ${followerId} has unfollowed user ${followedId}`);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

// Update a user
const updateUser = (req, res) => {
  // Get the userId from request parameters
  const { userId } = req.params;

  // Get the updated user data from the request body
  const updatedUser = req.body;

  // TODO: Implement code to update the user with userId using the updatedUser data

  // Return success message in the response
  res.json({ message: `User ${userId} has been updated` });
};

// Delete a user (soft delete)
const deleteUser = (req, res) => {
  const { userId } = req.params;

  db.then((pool) => {
    const query = `UPDATE Users SET deleted = 1 WHERE ID = @userId`;
    pool
      .request()
      .input('userId', userId)
      .query(query)
      .then(() => {
        return res.json(`User ${userId} has been deleted (soft delete)`);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

// Get user profile
const getUserProfile = (req, res) => {
  // Get the userId from request parameters
  const { userId } = req.params;

  // TODO: Implement code to fetch the user's profile from the database using userId
  // ...
  db.then(pool => {
    const query = `SELECT * FROM profiles WHERE User_Id = @userId`;
    pool
      .request()
      .input('userId', userId)
      .query(query)
      .then(result => {
        if (result.recordset.length === 0) {
          return res.status(404).json('Profile not found');
        }
        const profile = result.recordset[0];
        // Return the profile data in the response
        return res.json(profile);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};

// Update user profile
const updateProfile = (req, res) => {
  // Get the userId from request parameters
  const { userId } = req.params;

  // Get the updated profile data from the request body
  const updatedProfile = req.body;

  // TODO: Implement code to update the user's profile with userId using the updatedProfile data
  // ...
  db.then(pool => {
    const query = `UPDATE profiles SET full_name = @fullName, bio = @bio WHERE User_Id = @userId`;
    pool
      .request()
      .input('fullName', updatedProfile.fullName)
      .input('bio', updatedProfile.bio)
      .input('userId', userId)
      .query(query)
      .then(() => {
        return res.json({ message: `Profile for User ${userId} has been updated` });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};

// Upload profile picture
const uploadProfilePicture = (req, res) => {
  // Get the userId from request parameters
  const { userId } = req.params;

  // Get the uploaded file information
  const profilePicture = req.file;

  // TODO: Implement code to process and store the profile picture
  // ...

  // Return success message in the response
  res.json({ message: `Profile picture for user ${userId} has been uploaded` });
};

module.exports = {
  getUser,
  followUser,
  unfollowUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateProfile,
  uploadProfilePicture,
};
