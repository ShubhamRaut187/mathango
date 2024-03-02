const {Router} = require('express');
const {Boardmodel} = require('../Models/Board.model');
const {Authentication} = require('../Middlewares/Authentication');
const {userBoardLimiter} = require('../Middlewares/userBoardLimiter');
const { Usermodel } = require('../Models/User.model');
const {BoardAuthorization} = require('../Middlewares/BoardAuthorization')
const BoardRouter = Router();

// Create Board
BoardRouter.post('/create',Authentication,userBoardLimiter,async(req,res)=>{
    const {name,createdBy,members} = req.body;
    if(!name || !createdBy || !members){
        res.status(206).json({'Message':'Insufficient data'})
        return;
    }
    try {
        const newBoard = new Boardmodel({
            name,
            createdBy,
            members
        });
        await newBoard.save();
        res.status(201).json({'Message':'Board created',newBoard});
    } catch (error) {
        res.status(500).json({'Message':'Internal Server Error'});
        console.log(error);
    }
})

// Get all boards where user is member or creator
BoardRouter.get('/:id',Authentication,async(req,res)=>{
    const {id} = req.params;
    try {
        const boards = await Boardmodel.find({
            $or:[
                {createdBy:id},
                {members:{$in:[id]}}
            ]
        });
        res.status(200).json({boards});
    } catch (error) {
        console.log('Error while getting kanban boards',error);
        res.status(500).json({'Message':'Internal Server Error'});
    }
})

// Get recently visited 3 kanban boards of user
BoardRouter.get('/recent/:id',Authentication,async(req,res)=>{
    const {id} = req.params;
    try {
        const user = await Usermodel.findOne({_id:id});
        const recentvisited = user.recentlyVisitedBoards;
        if(!recentvisited){
            res.status(404).json({'Message':'User has not visited any board'});
            return;
        }
        else{
            const recentboards = [];
            for(let i = 0;i<recentvisited.length;i++){
                let boardid = recentvisited[i];
                const board = await Boardmodel.findOne({_id:boardid});
                recentboards.push(board);
            }
            res.status(200).json({recentboards});
        }
    } catch (error) {
        console.log('Error while getting recent kanban boards',error);
        res.status(500).json({'Message':'Internal Server Error'});
    }
})

// Get single board
BoardRouter.get('/:boardId',Authentication,async(req,res)=>{
    const{boardId} = req.params;
    const UserID = req.UserID;
    try {
        const board = await Boardmodel.findOne({_id:boardId});
        if(!board){
            res.status(404).json({'Message':'Board not found'});
            return
        }
        else{
            const user = await Usermodel.findOne({_id:UserID});
            let recentlyVisitedBoards = user.recentlyVisitedBoards;
            if(recentlyVisitedBoards.length >= 3){
                recentlyVisitedBoards.splice(0,1);
            }
            recentlyVisitedBoards.push(boardId);
            await Usermodel.findByIdAndUpdate(UserID,{recentlyVisitedBoards});
            res.status(200).json(board);
        }
    } catch (error) {
        console.log('Error while getting single kanban boards',error);
        res.status(500).json({'Message':'Internal Server Error'});
    }
})

// Update board
BoardRouter.patch('/update/:boardid',Authentication,BoardAuthorization,async(req,res)=>{
    const {boardid} = req.params;
    const data = req.body;
    if(!data){
        res.status(204).json({'Message':'No content'});
        return;
    }
    try {
        const updatedBoard = await Boardmodel.findOneAndUpdate({_id:boardid},data,{new:true});
        res.status(200).json({"Message":'Board updated',updatedBoard});
    } catch (error) {
        console.log('Error while updating single kanban boards',error);
        res.status(500).json({'Message':'Internal Server Error'});
    }
})

// Delete board
BoardRouter.delete('/delete/:boardid',Authentication,BoardAuthorization,async(req,res)=>{
    const {boardid} = req.params;
    try {
        const deletedBoard = await Boardmodel.findOneAndDelete({_id:boardid});
        res.status(200).json({deletedBoard});
    } catch (error) {
        console.log('Error while deleting single kanban boards',error);
        res.status(500).json({'Message':'Internal Server Error'});
    }
})

module.exports = {
    BoardRouter
}