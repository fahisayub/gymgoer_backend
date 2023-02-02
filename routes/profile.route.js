const {Router} = require('express');
const { profileController } = require('../controllers/profile.controller');
const { authorize } = require('../middlewares/authorize.middleware');
const { authenticate } = require('../middlewares/authenticate.middleware');

const profileRouter=Router();


profileRouter.get('/:id',authenticate,authorize(['user',"admin"]),profileController.getUserProfile)
profileRouter.put('/:id',authenticate,authorize(['user','admin']),profileController.updateProfile)


module.exports={
    profileRouter,
}