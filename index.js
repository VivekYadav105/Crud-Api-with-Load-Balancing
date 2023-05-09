const express = require('express')
const dotenv = require('dotenv');
const logger = require('./middleware/logMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware');
const userRouter = require("./router/userRouter");
const connectDB = require('./dbConnect');

dotenv.config();

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

app.use(logger)
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send("ok "+JSON.stringify(process.pid))
})

app.use('/api/user',userRouter);


app.route("*",(req,res,next)=>{
    res.status(404).send({
        message:"route doesn't exist",
        data:{},
        status:404
    })
})


connectDB()

if(process.env.RUN_MODE !== "cluster"){
    app.listen(port,(err)=>{
        if(!err) console.log("Listening to Port:",port)
    })    
}
else{
    module.exports = app;
}
