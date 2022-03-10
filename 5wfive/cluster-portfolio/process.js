const os = require("os");
const cluster = require("cluster");

// 1. Find the number of cores available on your machine ---------------------
const numCores = os.cpus().length;

// 2. Specify what file you want your workers to run -------------------------
cluster.setupMaster({
    exec: "", // provide the correct path to your main server script here
});

// 3. Use cluster.fork() to create as many child processes as you have cores -

// ...

// 4. Listen on the "exit" event to: -----------------------------------------
//     a) Log the process id of the worker that died
//     b) Spawn a new worker to replace it
cluster.on("exit", (worker) => {
    // ...
});
