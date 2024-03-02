const mongoose = require('mongoose');

// Task Schema
const Taskschema = mongoose.Schema({
    board:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['Unassigned','In Development','Pending Review','Done'],
        required:true
    },
    assignedTo:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    }
},{timestamps:true});

// Task Model
const Taskmodel = mongoose.model('tasks',Taskschema);

module.exports = {
    Taskmodel
}



// _id` (mongodb id)
//  `board` (ref to Board._id)
//  `title` (string)
//  `description` (string)
//  `category` (enum string: "Unassigned," "In Development,"
// "Pending Review," "Done")
//  `assignedTo` (ref to User._id)
//  `deadline` (date)
//  `createdAt` (date, timestamp)
//  `updatedAt` (date, timestamp)