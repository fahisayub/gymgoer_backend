const mongoose = require('mongoose');
const logSchema= new mongoose.Schema({
    userName:{type:String,required:true},
    userId:{type:String,required:true},
    adminId:{type:String,require:true},
    city:{type:String, required:true}

},{timestamps:true});

const LogModel=mongoose.model('log',logSchema);

module.exports={
    LogModel,
}