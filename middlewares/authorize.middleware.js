const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authorize = (roles) => {
  return async (req, res, next) => {
    let uid=req?.body?.uid;
console.log(uid);
    try{
        const user = await UserModel.findOne({ _id:uid });
        console.log(user);
        let role=user.role;
        console.log(role)
        if (roles.includes(role)) {
          next();
        } else {
          res.send({'msg':"Access Denied"});
        }
      } catch(err) {
        res.send({'msg':"Access Denied, Please try again later",err});
      }
    }
  };


module.exports = {
  authorize,
};
