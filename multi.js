const cluster = require('cluster')
const os = require('os')
const cpus = os.cpus().length
const http = require('http');
const httpProxy = require('http-proxy');

const port = process.env.MULTI_PORT || 4000
const app = require('./index.js')

const workers = {}; 
let workerIndex = 0;

function createWorker(){
    const worker = cluster.fork({ WORKER_PORT: 4001 + Object.keys(workers).length });
    console.log(`Worker ${worker.process.pid} spawned`);
    workers[worker.id] = {
        WORKER_PORT:4001 + Object.keys(workers).length,
        worker:worker
    };
}

if(cluster.isMaster){

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited`);
        delete workers[worker.id];
        createWorker();
      });

    cluster.on('fork', worker => {
        console.log(`Worker process with PID ${worker.process.pid} is online`);
    });

    for(var i=0;i<cpus/2;i++) createWorker();

    const proxy = httpProxy.createProxyServer();

    http.createServer((req, res) => {
      const worker = workers[Object.keys(workers)[workerIndex]];
      workerIndex = (workerIndex + 1) % (cpus/2);
      console.log(`[${new Date().toISOString()}] Request Proxied to http://localhost:${worker.WORKER_PORT}`)
      proxy.web(req, res, {
        target: `http://localhost:${worker.WORKER_PORT}`
      });
    }).listen(4000);

}
else{
    app.listen(process.env.WORKER_PORT,(err)=>{
        if(!err) console.log("Listening to Port:",process.env.WORKER_PORT)
    })    

    process.on('message', message => {
        if (message && message.type === 'request') {
            console.log(`Request received by worker ${process.pid}`);
        }
    });
}

