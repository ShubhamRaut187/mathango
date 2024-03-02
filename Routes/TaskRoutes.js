const {Router} = require('express');
const {Authentication} = require('../Middlewares/Authentication');
const {Taskmodel} = require('../Models/Task.model');

const TaskRouter = Router();

TaskRouter.post('/create',Authentication,async(req,res)=>{
    const {board,title,description,category,assignedTo,deadline} = req.body;
    if(!board || !title || !description || !category || !assignedTo || !deadline){
        res.status(206).json({'Message':'Insufficient data'})
        return;
    }
    try {
        const newTask = new Taskmodel({
            board,
            title,
            description,
            category,
            assignedTo,
            deadline
        });
        await newTask.save();
        res.status(201).json({'Message':'Task Created',newTask});
    } catch (error) {
        res.status(500).json({'Message':'Internal Server Error'});
        console.log(error);
    }
});

TaskRouter.get('/',Authentication,async(req,res)=>{
    try {
        if(req.query){
            const status = req.query.status;
            const tasks = await Taskmodel.find({category:status});
            if(!tasks){
                res.status(404).json({'Message':`No ${status} tasks found`});
            }
            else{
                res.status(200).json({tasks}); 
            }
        }
        else{
            const tasks = await Taskmodel.find({});
            res.status(200).json({tasks});
        }
    } catch (error) {
        res.status(500).json({'Message':'Internal Server Error'});
        console.log(error);
    }
})

TaskRouter.get('/:id',Authentication,async(req,res)=>{
    const {id} = req.params;
    try {
        const task = await Taskmodel.findOne({_id:id});
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({'Message':'Internal Server Error'});
        console.log(error);
    }
})

TaskRouter.patch('/update/:id',Authentication,async(req,res)=>{
    const {id} = req.params;
    const data = req.body;
    if(!data){
        res.status(206).json({'Message':'Insufficient data'})
        return;
    }
    try {
        const updatedTask = await Taskmodel.findOneAndUpdate({_id:id},data,{new:true});
        res.status(200).json({'Message':'Task Updated',updatedTask});
    } catch (error) {
        res.status(500).json({'Message':'Internal Server Error'});
        console.log(error);
    }
});

TaskRouter.delete('/delete/:id',Authentication,async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedTask = await Taskmodel.findOneAndDelete({_id:id});
        res.status(200).json({'Message':'Task Deleted',deletedTask});
    } catch (error) {
        res.status(500).json({'Message':'Internal Server Error'});
        console.log(error);
    }
})

module.exports = {
    TaskRouter
}