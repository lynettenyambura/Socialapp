const db = require('../config.js');

// Like a post
const likePost = (req, res) => {
  // Get the postId and userId from request parameters
  const { postId, userId } = req.params;

  db.then(pool => {
    // Check if the post exists
    const checkPostQuery = `SELECT * FROM posts WHERE id = @postId`;
    pool
      .request()
      .input('postId', postId)
      .query(checkPostQuery)
      .then(result => {
        if (result.recordset.length === 0) {
          return res.status(404).json('Post not found');
        }

        // Check if the user has already liked the post
        const checkLikeQuery = `SELECT * FROM Likes WHERE Likes_UserID = @userId AND Likes_PostID = @postId`;
        pool
          .request()
          .input('userId', userId)
          .input('postId', postId)
          .query(checkLikeQuery)
          .then(result => {
            if (result.recordset.length > 0) {
              return res.status(400).json('User already liked this post');
            }

            // Like the post
            const likeQuery = `INSERT INTO Likes (Likes_UserID, Likes_PostID) VALUES (@userId, @postId)`;
            pool
              .request()
              .input('userId', userId)
              .input('postId', postId)
              .query(likeQuery)
              .then(() => {
                // Increment the likes count in the posts table
                const updateLikesQuery = `UPDATE posts SET likes = ISNULL(likes, 0) + 1 WHERE id = @postId`;
                pool
                  .request()
                  .input('postId', postId)
                  .query(updateLikesQuery)
                  .then(() => {
                    // Retrieve the updated post with likes count
                    const postQuery = `SELECT *, (SELECT COUNT(*) FROM Likes WHERE Likes_PostID = @postId) AS likesCount FROM posts WHERE id = @postId`;
                    pool
                      .request()
                      .input('postId', postId)
                      .query(postQuery)
                      .then(result => {
                        if (result.recordset.length === 0) {
                          return res.status(404).json('Post not found');
                        }

                        const post = result.recordset[0];
                        return res.json(post);
                      })
                      .catch(err => {
                        return res.status(500).json(err);
                      });
                  })
                  .catch(err => {
                    return res.status(500).json(err);
                  });
              })
              .catch(err => {
                return res.status(500).json(err);
              });
          })
          .catch(err => {
            return res.status(500).json(err);
          });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};

// Unlike a post
const unlikePost = (req, res) => {
  // Get the postId and userId from request parameters
  const { postId, userId } = req.params;

  // TODO: Implement code to remove the like for the specified post and user
  db.then((pool) => {
    const query = `
      DELETE FROM Likes
      WHERE Likes_PostID = @postId AND Likes_UserID = @userId
    `;
    pool
      .request()
      .input('postId', postId)
      .input('userId', userId)
      .query(query)
      .then(() => {
        return res.json(`User ${userId} has unliked post ${postId}`);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

module.exports = {
  likePost,
  unlikePost
};
