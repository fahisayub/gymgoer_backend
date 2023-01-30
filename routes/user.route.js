const {Router} = require('express');
const {  UserController } = require('../controllers/user.controller');

const userRouter=Router();


userRouter.post('/register',UserController.registerUser)
userRouter.post('/login',UserController.userLogin)


module.exports={
    userRouter,
}