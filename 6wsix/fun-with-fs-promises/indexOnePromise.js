let { readdir, stat } = require("fs");

const { promisify } = require("util");
readdir = promisify(readdir);
stat = promisify(stat);

// 3 WAYS to make logsizes an Promise obj:
// 1: promisify(need callback); 2: use promise constructor;
// 3: log sizes returns a promise it becomes a promise (MERLE NOTES EASIEST WAY)

function logSizes(path) {
    //need a return of reddir
    return readdir(path, {
        withFileTypes: true,
    })
        .then(function (items) {
            //need an Array for promises
            const allOurPromises = [];
            items.forEach((item) => {
                let nextPath = `${path}/${item.name}`;
                if (item.isFile()) {
                    if (item.name != ".DS_Store") {
                        //add them to array
                        allOurPromises.push(
                            stat(nextPath).then(function (stats) {
                                console.log(nextPath + ": " + stats.size);
                            })
                        );
                    }
                } else {
                    //also push to array
                    allOurPromises.push(logSizes(nextPath));
                }
            });
            // return when all are finished
            return Promise.all(allOurPromises);
        })
        .catch(function (err) {
            console.log(err.message, "ERROR!!!");
        });
}

//made a Promise out of it
logSizes(`${__dirname}/files`).then(() => console.log("done!"));
