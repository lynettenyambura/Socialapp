const db = require('../config.js');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { sql } = require('mssql');
const nodemailer = require('nodemailer');
const emailConfig = require('../util/emailconfig.js');
const { sendEmail } = require('../util/sendEmail');

const register = (req, res) => {
  const { username, email, password, name, cover_pic, profile_pic, city } = req.body;

  // Check if the username or email already exists in the database
  const uniquenessQuery = `
    SELECT * FROM dbo.users WHERE username = @username OR email = @email
  `;

  db.then((pool) => {
    pool
      .request()
      .input('username', username)
      .input('email', email)
      .query(uniquenessQuery)
      .then((result) => {
        if (result.recordset.length > 0) {
          // If a matching user is found, return an error response
          return res.status(409).json('User already exists');
        }

        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.error('Error generating salt:', err);
            return res.status(500).json(err);
          }

          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
              console.error('Error hashing password:', err);
              return res.status(500).json(err);
            }

            const insertQuery = `
              INSERT INTO users (username, email, password, name, cover_pic, profile_pic, city)
              VALUES (@username, @email, @password, @name, @cover_pic, @profile_pic, @city)
            `;

            pool
              .request()
              .input('username', username)
              .input('email', email)
              .input('password', hashedPassword)
              .input('name', name)
              .input('cover_pic', cover_pic)
              .input('profile_pic', profile_pic)
              .input('city', city)
              .query(insertQuery)
              .then(() => {
                // Send registration email to the user
                const subject = 'Welcome to our social website';
                const text = `Dear ${name}, thank you for registering on our website.`;

                sendEmail(email, subject, text)
                  .then(() => {
                    return res.status(201).json('User has been created successfully');
                  })
                  .catch((err) => {
                    console.error('Error sending email:', err);
                    return res.status(500).json(err);
                  });
              })
              .catch((err) => {
                console.error('Error inserting user:', err);
                return res.status(500).json(err);
              });
          });
        });
      })
      .catch((err) => {
        console.error('Error checking user uniqueness:', err);
        return res.status(500).json(err);
      });
  });
};






const login = (req, res) => {
  const { username, password } = req.body;
  // TODO: Implement login functionality
  const q = `SELECT * FROM dbo.users WHERE username = @username`;

  db.then((pool) => {
    pool
      .request()
      .input('username', username)
      .query(q)
      .then((result) => {
        if (result.recordset.length === 0) {
          return res.status(404).json('User not found');
        }

        bcrypt.compare(password, result.recordset[0].password, (err, checkPassword) => {
          if (err) return res.status(500).json(err);

          if (!checkPassword) {
            return res.status(400).json('Wrong password or username');
          }
          // Generate a unique session ID
          const sessionId = uuidv4();

          // Set the session ID in the response cookie
          res.cookie('sessionId', sessionId);

          // Store any necessary session data in req.session for future use
          req.session.authorized = true;
          req.session.user = result.recordset[0].username;

          return res.status(200).json('Login successful');
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};



  
  
const logout = (req, res) => {
  // TODO: Implement logout functionality
  const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "An error occurred during logout",
          error: err,
        });
      }
  
      // Clear the session cookie
      res.clearCookie('sessionId');
  
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  };
  
  res.send('Logout successful');
};

module.exports = {  register, login, logout };
