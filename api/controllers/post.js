const db = require('../config.js');

// Create a new post
const createPost = (req, res) => {
  // Get the post data from the request body
  const { postdescription, Image, UserId, createdAt} = req.body;

  db.then(pool => {
    const query = `
      INSERT INTO posts (postdescription, Image, UserID, createdAt)
      VALUES (@postdescription, @Image, @UserId, @createdAt)
    `;

    pool
      .request()
      .input('postdescription', postdescription)
      .input('Image', Image)
      .input('UserId', UserId)
      .input('createdAt', createdAt)
      
      .query(query)
      .then(() => {
        return res.json({ message: 'Post created successfully' });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};

// Retrieve a specific post
const getPost = (req, res) => {
  // Get the postId from request parameters
  const { postId } = req.params;

  // TODO: Implement code to fetch the post from the database using postId
  db.then(pool => {
    const postQuery = `SELECT * FROM posts WHERE id = @postId`;
    const likesQuery = `DECLARE @likesCount INT; EXEC GetLikesCountByPostID @PostID = @postId, @LikesCount = @likesCount OUTPUT; SELECT @likesCount AS LikesCount;`;
    
    pool
      .request()
      .input('postId', postId)
      .query(`${postQuery}; ${likesQuery}`)
      .then(result => {
        // Check if post exists
        if (result.recordsets[0].length === 0) {
          return res.status(404).json('Post not found');
        }

        // Get the post data
        const post = result.recordsets[0][0];

        // Get the likes count
        const likesCount = result.recordsets[1][0].LikesCount;

        // Add the likes count to the post object
        post.likesCount = likesCount;

        // Return the post data in the response
        return res.json(post);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};

// Delete a post
const deletePost = (req, res) => {
  // Get the postId from request parameters
  const { postId } = req.params;

  // TODO: Implement code to delete the post from the database
  db.then(pool => {
    const query = `DELETE FROM posts WHERE id = @postId`;
    pool
      .request()
      .input('postId', postId)
      .query(query)
      .then(() => {
        return res.json({ message: 'Post deleted successfully' });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });
};

module.exports = {
  createPost,
  getPost,
  deletePost
};
