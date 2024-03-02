const {Router} = require('express');
const {Usermodel} = require('../Models/User.model');
const {Authentication} = require('../Middlewares/Authentication')

const UserRouter = Router();

UserRouter.get('/:id',Authentication,async(req,res)=>{
    const {id} = req.params;
    try {
        const user = await Usermodel.findOne({_id:id});
        res.status(200).json({user});
    } catch (error) {
        console.log('Error while gettubg single user',error);
        res.status(500).json({'Message':'Internal Server Error'});
    }
})

module.exports = {
    UserRouter
}