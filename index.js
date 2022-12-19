/*
    define the port
*/ 
let port = process.env.PORT;
    if (port == null || port == "") {
        port = 4000;
}

/*
    declare global variables available to user for all ejs files
*/
global.loggedIn = null;
/* 
    import modules
*/
// packages
const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash'); // provides a special area of the session used for storing messages. Messages can be written to this area and cleared after being displayed to the user
const path = require('path');
// controllers
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/loginUser');
const logUserController = require('./controllers/logUser');
const logoutController = require('./controllers/logout');
// custom middlewares 
const toLoginValidationCustomMiddleware = require('./middlewares/toLoginValidation');
const ValidateformCustomMiddleware = require('./middlewares/formValidation');
const authMiddleware = require('./middlewares/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middlewares/redirectIfAuthenticatedMiddleware');
/* 
    create our app server
*/
const app = new express()
/*
    connect to mongodb from node
*/
mongoose.connect(
    'mongodb+srv://2MD:Adamasonko93@cluster0.lwup07w.mongodb.net/my_database', 
    {useNewUrlParser: true}, 
    (e) => {
        if (e) {
            console.log(e)
        } else {
            console.log('connected to mongoDB')
        }
    }
);
/*
    set up a view engine by using ejs
*/
app.set('view engine','ejs')
/* 
    set up the port of the app server
*/
app.listen(port, ()=>{
    console.log('App listening on port 4000')
})
/* 
    the middlewares
*/ 
//get the staticFile folder from the express middleware static() 
app.use(express.static('./public'))
// the express session package with the config object secret key sign in the user for each request to the server by saving its credencials under the devtool app-cookie tab and encrypt session ID
app.use(expressSession({secret:'keyboard cat'})); 
// custom middleware to get user session id stored in our global variable for every request to the server
app.use("*", (req, res, next) => 
    {
        loggedIn = req.session.userId;
        next()
    }
);
//use the express-fileupdload middleware to provide fileuploads handlers by enabling the files object inside the req object 
app.use(fileUpload());
//use a body parser middleware json() and urlencoded() to make available the request body content
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}))
// custom form validation middleware to handle the validation of the form data from the user when storing posts
//app.use('/posts/store',ValidateformCustomMiddleware) 
// custom middleware to validate data when to login  
app.use('/users/login',toLoginValidationCustomMiddleware) 
//handle flushing (flush away errors after they are displayed) by enabling req.flash()
app.use(flash());
/* 
    handle get request
*/
app.get('/', homeController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/post/:id', getPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);

/* 
    handle post request
*/
app.post('/posts/store', authMiddleware,storePostController);   
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login',redirectIfAuthenticatedMiddleware, logUserController);
/*
    handle not found routes
*/ 
app.use((req, res) => res.render('notfound'));