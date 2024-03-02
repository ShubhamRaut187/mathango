const mongoose = require('mongoose');

// User Schema
const Userschema = mongoose.Schema({
    googleId:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    recentlyVisitedBoards:{
        type:[String],
        default:undefined
    }
},{timestamps:true});

// User Model
const Usermodel = mongoose.model('users',Userschema);

module.exports = {
    Usermodel
}