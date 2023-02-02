const { UserModel } = require("../models/user.model");






const getProfile = async (req, res) => {
    let { id } = req.params;
    try {

        let user = await UserModel.findOne({ _id: id });
        res.send({ user });

    } catch (err) {
        res.send({ msg: "Something went wrong", error: err });
    }
};
const getUserDetails = async (req, res) => {
    let referalCode = req.params.id;
    try {

        let user = await UserModel.findOne({ referalCode });
        res.send({ user });

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
    getProfile,
    updateProfile,getUserDetails
};
module.exports = {
    profileController,
};

