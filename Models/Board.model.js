const mongoose = require('mongoose');

// Book Schema
const Boardschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    members:{
        type:[String],
        default:[]
    }
    
},{timestamps:true})

// Book Model
const Boardmodel = mongoose.model('boards',Boardschema);

module.exports = {
    Boardmodel
}



//  _id (mongodb id)
//  `name` (string)
//  `createdBy` (ref to User._id)
//  `members` (Array of ref to User._id)
//  `createdAt` (date, timestamp)
//  `updatedAt` (date, timestamp