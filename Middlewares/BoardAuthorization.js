const {Boardmodel} = require('../Models/Board.model');
const BoardAuthorization = async(req,res,next) => {
    const UserID = req.UserID;
    const {boardid} = req.params;
    try {
        const board = await Boardmodel.findOne({_id:boardid});
        if(board.createdBy === UserID){
            next();
        }
        else{
            res.status(401).json({'Message':'You are not authorized'});
            return;
        }
    } catch (error) {
        console.log('Error in board authorization middleware',error);
        res.status(500).json({'Message':'Internal Server Error'});
    }
}

module.exports = {
    BoardAuthorization
}