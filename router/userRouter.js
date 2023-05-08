const {Router} = require("express")
const {fetchAllUsers,getUser,createUser,updateUser,deleteUser} = require('../controller/userController')

const userRouter = Router();

userRouter.get('/',fetchAllUsers);
userRouter.get('/:userId',getUser);
userRouter.post("/",createUser);
userRouter.put("/:userId",updateUser);
userRouter.delete("/:userId",deleteUser);

userRouter.get("*",(req,res,next)=>{
    return res.status(404).json({
        message:"route doesn't exist",
        data:{},
        status:404
    })
})

module.exports = userRouter;