const {Boardmodel} = require('../Models/Board.model');
const userBoardLimiter = async(req,res,next) => {
    const userID = req.userID;
    try {
        const board = await Boardmodel.findOne({createdBy:userID});
        if(board){
            res.status(403).json({'Message':'You are not allowed to create more than one kanban board'});
            return
        }
        else{
            next();
        }
    } catch (error) {
        res.status(500).json({'Message':'Internal server error'});
        console.log('Error in userBoardlimiter middleware');
        console.log(error);
    }
}

module.exports = {
    userBoardLimiter
}
