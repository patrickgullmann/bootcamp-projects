const { readdir, stat } = require("fs").promises;
function logSizes(dir) {
    //step 1: make sure that our logSizes function actually returns a promise,
    // that is much easier than you think, all you need to do it return the call to readdir below
    // remember readdir is now a promise based function!
    readdir(dir, { withFileTypes: true })
        .then((content) => {
            // declare a variable, that will keep track of all the promises, that we are about to create like so:
            const allOurPromises = [];
            for (let i = 0; i < content.length; i++) {
                if (content[i].isFile()) {
                    // this is the first promise we want to push into our allOurPromises array
                    // so allOurPromises.push( // place here all the code from the next three lines!)
                    stat(dir).then((stats) => {
                        console.log(`${dir}/${content[i].name}: `, stats.size);
                    }); // little side note, you are not passing the right thing to stat, stat expects a path to a filename
                    // you are passing to it the path to the directory we are reading, so you need to fix that
                }
                if (content[i].isDirectory()) {
                    // below is the next promise we want to push into our allOurPromises array
                    logSizes(`${dir}/${content[i].name}`);
                }
            }
            // return Promise.all and pass to it our array of Promises,
            // that is keeping track of all our function calls that we generated in the looop above
        })
        .catch((err) => {
            console.log(err);
        });
}
logSizes(__dirname).then(() => console.log("done")); // I chained on the then, and added the console log for done!
