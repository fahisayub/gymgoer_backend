const { Router } = require('express');
const { logController } = require('../controllers/logs.controller');
const { authenticate } = require('../middlewares/authenticate.middleware');
const { authorize } = require('../middlewares/authorize.middleware');

const logRouter = Router();


logRouter.get('/get', authenticate, authorize(['user', "admin"]), logController.getlog)
logRouter.post('/create', authenticate, authorize(['admin']), logController.addlog)


module.exports = {
    logRouter,
}