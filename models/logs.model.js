const mongoose = require('mongoose');
const logSchema= new mongoose.Schema({
    userId:{type:String,required:true},
    userUid:{type:String,required:true},
    adminUid:{type:String,require:true},
    city:{type:String, required:true}

},{timestamps:true});

const LogModel=mongoose.model('log',logSchema);

module.exports={
    LogModel,
}