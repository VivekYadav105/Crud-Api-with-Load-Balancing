const userModel = require('../models/user')
const uuid = require("uuid")
const {getOrSetCachedInfo,changeCachedInfo} = require('../redis-config')

const fetchAllUsers = (req,res,next)=>{
    if(req){
        userModel.find({}).then((data)=>(
            res.status(200).json({
                status:200,
                data:data
            })    
        )).catch(next)
    }
}

const getUser = (req,res,next)=>{
    
    const id = req.params.userId
    if(!uuid.validate(id)){
    res.status(400)
    next(Error("given id is an Invalid id"))
    return
    }
    getOrSetCachedInfo(id,()=>userModel.findById(id)).then((data)=>{
        if(data==null || data=={}){
            res.status(400)
            throw new Error("User with given id doen't exist")
        }
        return res.status(200).json({
            status:200,
            data:data
        })
    }).catch(next)
}

const createUser = (req,res,next)=>{
    console.log(req.body)
    const {username,hobbies,age} = req.body
    if(!username) {
        res.status(400)
        next(new Error("Usernamme is not valid"))
    }
    const id = uuid.v4()
    getOrSetCachedInfo(id,()=>userModel.create({
        _id:id,
        username:username,
        hobbies:hobbies,
        age:age
    })).then((data)=>{
        res.status(201)
        return res.json({
            status:201,
            message:"user updated successfully",
            data:data
        })
    }).catch(next)
}

const updateUser = (req,res,next)=>{
    const userId = req.params.userId
    const {username,hobbies,age} = req.body
    if(username==="" || age===""){
        res.status(400)
        return next(Error("New values are in invalid format"))
    }
    if(!uuid.validate(userId)){
        res.status(400)
        return next(Error("given id is an Invalid id"))
        }
    changeCachedInfo(userId,()=>userModel.findByIdAndUpdate(userId,{username:username,hobbies:hobbies,age:age},{new: true})).then((data)=>{
        res.status(200)
        return res.json({
            status:200,
            message:"user updated successfully",
            data:data
        })
    }).catch(next)
}

const deleteUser = (req,res,next)=>{
    const id = req.params.userId
    if(!uuid.validate(id)){
        res.status(400)
        next(Error("given id is not a valid id"))
        return
    }
    changeCachedInfo(id,()=>userModel.findByIdAndDelete(id)).then((data)=>{
        res.status(200)
        return res.json({
            status:200,
            message:"user deleted successfully",
            data:data
        })
    }).catch(next)
}    

module.exports = {fetchAllUsers,getUser,updateUser,createUser,deleteUser}