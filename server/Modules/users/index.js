const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_I = 10;
const RandomNumber = require("randomstring");
require("dotenv").config();
const Schema = mongoose.Schema;
const userSchema = new Schema({
    loginid:{
        type: String,
        required: true,
        unique: 1,
        maxlength: 50
    },
    first:{
        type: String,
        required: true,
        maxLength: 50
    },
    middle:{
        type: String,
        required: false,
        maxLength: 50
    },
    surname:{
        type: String,
        required: true,
        maxLength: 50
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1,
    },
    mobile:{
        type: String,
        minlength: 10,
        required: true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    comfpassword:{
        type: String,
        minlength: 8
    },
    uniqueid:{
        type: Number,
        required: true,
        maxlength: 16
    },
    history:{
        type: Array,
        default: []
    },
    role:{
        type: Number,
        default: 0
    },
    token:{
        type: String
    },
    linkid:{
        type:String
    },
    createdAt:{
        type: Date
    },
    updatedAt:{
        type: Date
    },
    active:{
        type:Number,
        default:1
    }
    
});

userSchema.pre("save",function(next){
    var user = this;
    if(user.isModified("password")){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET);
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this;

    jwt.verify(token,process.env.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}

const User = mongoose.model("m_user",userSchema);

module.exports = { User };