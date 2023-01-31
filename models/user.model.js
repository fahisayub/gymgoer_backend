const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const userSchema= new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    name:{type:String,required:true},
    userId:{type:String,required:true},
    referalCode:{type:String, required:true,default:nanoid(6)},
    role:{type:String,default:'user'}

},{timestamps:true});

const UserModel=mongoose.model('user',userSchema);

module.exports={
    UserModel,
}