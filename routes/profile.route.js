const {Router} = require('express');
const { profileController } = require('../controllers/profile.controller');
const { authorize } = require('../middlewares/authorize.middleware');
const { authenticate } = require('../middlewares/authenticate.middleware');

const profileRouter=Router();


profileRouter.get('/:id',authenticate,authorize(['user',"admin"]),profileController.getProfile)
profileRouter.put('/:id',authenticate,authorize(['user','admin']),profileController.updateProfile)
profileRouter.get('/userdata/:id',authenticate,authorize(['admin']),profileController.getUserDetails)


module.exports={
    profileRouter,
}