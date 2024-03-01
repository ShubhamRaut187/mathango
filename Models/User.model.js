const mongoose = require('mongoose');

// User Schema
const Userschema = mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    recentlyVisitedBoards:{
        type:[String],
        default:undefined
    },
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
});

// User Model
const Usermodel = mongoose.model('users',Userschema);

module.exports = {
    Usermodel
}