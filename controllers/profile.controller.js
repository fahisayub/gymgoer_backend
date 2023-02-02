const { UserModel } = require("../models/user.model");






const getUserProfile = async (req, res) => {
  let { id } = req.params;
  let {role}=req.body;
  try {
    if(role=='user'){

        let user = await UserModel.findOne({ _id: id });
        res.send({  user });
    }else if(role=='admin'){
        let user = await UserModel.findOne({ referalCode: id });
        res.send({  user });

    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
};

const updateProfile = async (req, res) => {
  let { id } = req.params;
  try {
    let update = req.body;
    let updatedstatus = await UserModel.updateOne(
      { _id: id },
      { ...update }
    );
    res.send({ msg: "item updated successfully", updatedstatus });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
};



const profileController = {
  getUserProfile,
  updateProfile,
};
module.exports = {
  profileController,
};

