const mongoose = require('mongoose')
const uuid = require("uuid")

const userSchema = new mongoose.Schema({
    _id:{type:String,immutable:true,default:uuid.v4()},
    username:{type:String,required:true},
    age:{type:Number,required:true},
    hobbies:[{type: String}]
}) 

const userModel = mongoose.model('user',userSchema)

module.exports = userModel;