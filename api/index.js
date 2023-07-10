const Express = require('express');
const app = Express();
const dotenv = require('dotenv');
const session = require('express-session');
const{ v4: uuidv4 } = require('uuid');

dotenv.config();
const usersRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');
const postsRoutes = require('./routes/posts.js');
const commentsRoutes = require('./routes/comments.js');
const likesRoutes = require('./routes/likes.js');

const oneDay = 1000 * 60 * 60 * 24;

//middlewares
app.use(Express.json());
app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:false,
    genid: () => uuidv4(),
    resave:true,
    cookie:{
         httpOnly : true,
         //secure:true,
        maxAge: oneDay

    }
}));
app.get('/', (req, res) => {
    console.log(req.sessionID);
    const authorized = req.session.authorized;
    if (authorized) {
        res.send("You are logged in");
    } else {
        res.status(401).json({
            success: false,
            message: "Log in to continue"
        });
    }
    
});



// app.get('/login/:username/:pass', (req, res) => {
//     const { username, pass } = req.params;
//     console.log(username, pass);
//     if (username && pass) {
//         req.session.authorized = true;
//         req.session.user = username;
//         res.json({
//             success: true,
//             message: "Logged in successfully",
//         });
//     } else {
//         res.status(401).json({
//             success: false,
//             message: "Invalid credentials",
//         });
//     }
// });

app.get('/logout', (req, res) => {
    if (req.session.authorized) {
        req.session.destroy();
        res.send('Logged out successfully');
    } else {
        res.status(401).json({
            success: false,
            message: "You are not logged in",
        });
    }
});


app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


