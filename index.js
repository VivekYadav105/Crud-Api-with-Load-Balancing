const express = require('express')
const dotenv = require('dotenv');
const logger = require('./middleware/logMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware');
const userRouter = require("./router/userRouter");
const { default: mongoose } = require('mongoose');
// const {client,getOrSetCachedInfo,deleteCachedInfo,changeCachedInfo} = require('./redis-config')
dotenv.config();

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

app.use(logger)

app.use('/api/user',userRouter);

app.get('/',(req,res,next)=>{
    res.redirect('postman url here')
})

app.route("*",(req,res,next)=>{
    return res.status(404).json({
        message:"route doesn't exist",
        data:{},
        status:404
    })
})

app.use(errorMiddleware)

mongoose.connect(process.env.MONGO_URI).then((succ,err)=>{
    if(!err) console.log("connected to db successfully ",succ.connection.host)
})

app.listen(port,(err)=>{
    if(!err) console.log("Listening to Port:",port)
})
