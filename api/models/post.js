// const express = require("express");
// const router = express.Router();
// const sql = require("mssql");

// // Database configuration
// const config = {
//   user: "your-username",
//   password: "your-password",
//   server: "your-server.database.windows.net",
//   database: "your-database",
//   options: {
//     encrypt: true,
//   },
// };

// // Create a connection pool
// const pool = new sql.ConnectionPool(config);
// const poolConnect = pool.connect();

// // Register route
// router.post("/register", async (req, res) => {
//   await poolConnect; // Wait for the pool to connect

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const newUser = {
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     };

//     const request = pool.request();
//     request.input("username", sql.NVarChar, newUser.username);
//     request.input("email", sql.NVarChar, newUser.email);
//     request.input("password", sql.NVarChar, newUser.password);

//     // Execute the query to save the user
//     const result = await request.query(
//       "INSERT INTO Users (username, email, password) VALUES (@username, @email, @password)"
//     );

//     res.status(200).json(newUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Login route
// router.post("/login", async (req, res) => {
//   await poolConnect; // Wait for the pool to connect

//   try {
//     const request = pool.request();
//     request.input("email", sql.NVarChar, req.body.email);

//     // Execute the query to find the user by email
//     const result = await request.query(
//       "SELECT * FROM Users WHERE email = @email"
//     );

//     if (result.recordset.length === 0) {
//       return res.status(404).json("User not found");
//     }

//     const user = result.recordset[0];

//     // Compare passwords
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!validPassword) {
//       return res.status(400).json("Wrong password");
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
