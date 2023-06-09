const errorMiddleware = (err,req,res,next)=>{
    console.log("inside middleware")
    if(res.statusCode==200) res.statusCode=500;
    const errStatus = res.statusCode || 500;
    const errMessage = err.message||"something went wrong";
    const errStack = process.env.NODE_ENV==="development"? err.stack : {}
    return res.status(errStatus).send({
        success:false,
        status:errStatus,
        stack:errStack,
        message:errMessage
    })
}

module.exports = errorMiddleware;