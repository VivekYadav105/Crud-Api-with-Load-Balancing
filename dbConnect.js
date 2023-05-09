const mongoose = require('mongoose')
const {client} = require('./redis-config')

async function connectDB(){
    await client.connect()

    mongoose.connect(process.env.MONGO_URI).then((succ,err)=>{
        if(!err) console.log("connected to db successfully ",succ.connection.host)
    })
    
}


module.exports = connectDB

