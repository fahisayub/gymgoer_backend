const {  LogModel } = require("../models/logs.model");

const getlog = async (req, res) => {

  try {
    let logs =await LogModel.find({});
    res.send(logs);
  } catch (err) {
    res.send({ msg: "Something went wrong while fetching logs", error: err });
  }
};
const addlog = async (req, res) => {
  let newlog = req.body;
  console.log(newlog);
  try {
    let log = await LogModel.insertMany([{...newlog}]);
    res.send({ msg: "log added successfully", Newlog: log });
  } catch (err) {
    res.send({ msg: "Something went wrong while adding log", error: err });
  }
};


const logController = {
  getlog,
  addlog,
};
module.exports = {
  logController,
};

