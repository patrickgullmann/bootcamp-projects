//we run master.js (is the orchestrator) and its
//master.js holds code which allows us to run server.js multiple times
//WHY WE DO THIS?
// that we can handle multipe requests at the same time and not queing that
//eg. we have 160 requests from users we will not have 160 queing we will
// have 10 reqeusts queing at 16 cores/each

const os = require("os");
const cluster = require("cluster");

//setup of cores
cluster.setupMaster({
    exec: "server.js",
});

//start multiple processes
for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
}

//handling errors
cluster.on("end", (worker) => {
    console.log("WORKER DIED", worker.process.pid);
    cluster.fork();
});

// cluster.on -> //if one process ended bc of a thrown error (in server.js)
//-> we know one is free and say just start again

//would start the process 4 times, but not dynamic -> like above bc I have 4 cpus
// cluster.fork();
// cluster.fork();
// cluster.fork();
// cluster.fork();

//i could write more if I want but then it will not run on more cores! it will then just put e.g.
//two on one core and try them parallel -> no processing power won :D
