const RandomNumber = require("randomstring");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { User } = require("../../Modules/users");

const uniqueid = RandomNumber.generate({
    length: 7,
    charset: "numeric"
});
const linkid = RandomNumber.generate({
    length: 8,
    charset: "hex",
    capitalization: "uppercase"
})


exports.userAuth = ( req, res, next ) =>{
    res.status(200).json({
        // user: req.user
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        name: req.user.first + " " + req.user.surname,
        uniqueid: req.user.uniqueid,
        email: req.user.email,
        mobile: req.user.mobile,
        cart: req.user.cart,
        history: req.user.history,
        role: req.user.role
    })
}
//=========== USER AUTH API END HERE ============//
exports.userRegister = ( req, res, next ) => {
    const user = new User(req.body);
    // user.loginid = loginid;
    // user.first = first;
    // user.middle = middle;
    // user.surname = surname;
    user.uniqueid = uniqueid;
    user.linkid = linkid;
    user.save((err,doc) => {
        if(err) return res.status(400).json({success:false,err});
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })

};
//=========== USER REGISTER API END HERE ============//
exports.userLogin = ( req, res, next ) => {
    User.findOne({"email":req.body.userNameOrEmail},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,message:"Auth failed, account not found !"});
        if(!user.active) return res.json({loginSuccess:false,message:"Auth failed, account not actived !"});
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:"Wrong password !"});
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                req.session.w_auth = user.token;
                req.session.uniqueid = user.uniqueid;
                req.session.loggedin = true;
                res.cookie("w_auth",user.token).status(200).json({
                    loginSuccess: true,
                    message: "Login Success Welcome !..........",
                    // userdata: user
                })
            })

        })
    })
}
//=========== USER LOGIN API END HERE ============//
exports.userLogout = ( req, res, next ) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: " " },
        (err,doc) => {
            if(err) return res.json({ success: false });
            return res.status(200).send({ success: true });
        }
    )
    req.session.destroy();
}
//=========== USER LOGOUT API END HERE ============//


