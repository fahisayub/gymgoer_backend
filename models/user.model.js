const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    name:{type:String,required:true},
    userId:{type:String,required:true},
    referalCode:{type:String, required:true},
    role:{type:String,default:'user'},
    city:{type:String, default:''}

},{timestamps:true});

const UserModel=mongoose.model('user',userSchema);

module.exports={
    UserModel,
}