const { UserModel } = require('../models/user.model');
const argon = require('argon2');
const jwt = require('jsonwebtoken');

let registerUser = async (req, res) => {
    let credentials = req.body;
    let user = await UserModel.findOne({ email: credentials.email });

    if (!user) {
        try {

            const hashpass = await argon.hash(credentials.password, 3);
            credentials.password = hashpass;
            let newUser = await UserModel.save(credentials);
            res.send({ msg: `Welcome ${newUser.name},You have registered successfully` })
        } catch (e) {
            res.send({ errmsg: 'Something went wrong!', err: e });
        }

    } else {
        res.send({ msg: 'User already exists,try login' })
    }
}

let userLogin = async (req, res) => {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
        res.send({ errmsg: 'Invalid user credentials!', err });
    } else {
        try {
            let verifyed = await argon.verify(user.password, password);
            if (!verifyed) {
                res.send({ msg: 'Invalid user credentials!' });
            } else {
                let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' })
                let refreshtoken = jwt.sign({}, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' })
                let payload = {
                    msg: `Welcome ${user.name}, You have logged in successfully`,
                    token, refreshtoken,
                }
                res.send(payload);
            }
        } catch (e) {
            res.send({ errmsg: 'Something went wrong!', err: e })
        }
    }
}

const UserController = {
    registerUser,userLogin
}

module.exports = {
    UserController
}