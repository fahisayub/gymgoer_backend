const { UserModel } = require('../models/user.model');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const {nanoid}=require('nanoid/non-secure')
const registerUser = async (req, res) => {
    const credentials = req.body;
    let user = await UserModel.findOne({ email: credentials.email });

    if (!user) {
        console.log(credentials);
        try {
            let referalCode=  nanoid(6)
            const hashpass = await argon.hash(credentials.password, 3);
            await UserModel.create([{...credentials,password:hashpass,referalCode}]);
          console.log({...credentials,password:hashpass});
            res.send({ msg: `Welcome ${credentials.name},You have registered successfully` })
        } catch (e) {
            res.send({ errmsg: 'Something went wrong!', err: e });
        }

    } else {
        res.send({ msg: 'User already exists,try login' })
    }
}

const userLogin = async (req, res) => {
    let { userId, password, role } = req.body;
    let user = await UserModel.findOne({ userId });
    if (!user) {
        res.send({ errmsg: 'Invalid user credentials!', err });
    } else {
        if (role === 'admin') {
            if (user.password === password) {
                let token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, { expiresIn: '1h' })
                let refreshtoken = jwt.sign({}, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' })
                let payload = {
                    msg: `Welcome ${user.userId}, You have logged in successfully`,
                    token, refreshtoken, role: 'admin'
                }
                res.send(payload);
            } else {
                res.send({ errmsg: 'Invalid admin credentials!', err });
            }

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
                        token, refreshtoken, role: 'user'
                    }
                    res.send(payload);
                }
            } catch (e) {
                res.send({ errmsg: 'Something went wrong!', err: e })
            }
        }
    }
}

// const google=passport.authenticate('google', { scope: ['profile', 'email'] })

// const googlecallback=passport.authenticate('google', { failureRedirect: '/user/login', session: false });
// const redirect=(req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// }




const UserController = {
    registerUser, userLogin
}

module.exports = {
    UserController,
}