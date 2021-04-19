const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
var MongoDBStore = require('connect-mongodb-session')(session);
require("dotenv").config();

//====================================
//========== EXPRESS INIT ============
//====================================
const app = express();
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DATABASE_DEV,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded( {extended:true} ));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization,Origin, X-Requested-With, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Cache", "no-cache");
    return next();
});

var store = new MongoDBStore({
    uri: process.env.DATABASE_DEV,
    collection: 'm_sessions'
});

// Catch errors
store.on('error', function(error) {
    console.log(error);
});

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
}));

//============= MIDDLEWARES INIT =============//
const { auth } = require("./Middlewares/auth");

//=============== ROUTER  INIT ==============//
const userRouter = require("./Routers/users");
//=== AUTHENTICATION API START ====//
app.get("/api/users/auth",auth,userRouter.userAuth);
//=== AUTHENTICATION API ENDING ===//

//====== USER API START ======//
app.post("/api/users/register",userRouter.userRegister);
app.post("/api/users/login",userRouter.userLogin);
app.get("/api/users/logout",auth,userRouter.userLogout);
//====== USER API END ======//

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server Runing at ${port}`);
})