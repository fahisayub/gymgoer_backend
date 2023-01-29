const {Router} = require('express');
const {  UserController } = require('../controllers/user.controller');

const UserRouter=Router();


UserRouter.post('/register',UserController.registerUser)
UserRouter.post('/login',UserController.userLogin)


module.exports={
    UserRouter,
}