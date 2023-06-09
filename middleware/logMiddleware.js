const logMiddleware = (req,res,next)=>{
    console.info(`[${new Date().toISOString()}] ${req.method} ${req.get('host')}${req.url} |body:${JSON.stringify(req.body)}|params:${JSON.stringify(req.params)}`);
    res.on("finish", () => {
        console.info(`[${new Date().toISOString()}]  ${res.statusCode} ${res.statusMessage}; ${res.get("Content-Length") || 0}b sent`);
      });
    next();
}

module.exports = logMiddleware