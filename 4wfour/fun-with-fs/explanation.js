//fs.chown(..) ggf nutzen?
//we will use fs.readdir(..) and fs.stat(...)

//we are in asynchronos processes!! -> meaning we need to handle?

//node hast asynchornus api (they take callbacks) and synchronos api!!! so here things will wait //there are also Promises but this next week

const fs = require("fs");

/* <----------------------------SYNC -------------------------> */

//const files = fs.readdirSync(__dirname); //__dirname is just a path to the file! you could also
//const files = fs.readdirSync(`${__dirname}/files`);
//const files = fs.readdirSync(`${__dirname}/files/funkychicken`); //note: if it is a wrong path it will throw an error -> need to handle it

// const files = fs.readdirSync(`${__dirname}/files`, {
//     withFileTypes: true, //you can also pass another argument and get an array with object inside of all files and information
// });

// //note: this just happens after the function bc synchronos function
// console.log(files);

//if we use the withFileTypes we can loop over and eg get the name and check if it is file or directory
// files.forEach((item) => {
//     console.log(item.name, item.isDirectory(), item.isFile());
// });

/* <----------------------------ASYNC -------------------------> */
//without error handling

// fs.readdir(
//     `${__dirname}/files`,
//     {
//         withFileTypes: true,
//     },
//     (err, files) => {
//         console.log(files);
//     }
// );

//with error handling

fs.readdir(
    `${__dirname}/files`,
    {
        withFileTypes: true,
    },
    (err, files) => {
        if (err) {
            console.log("ERROR", err); //if we would change e.g. filename to ../funkychicken
        } else {
            console.log(files);
        }
    }
);

// console.log("waiting for readdir to log files"); //files loggin here would not work bc the mehtod before is async

/* <----------------------------SYNC -------------------------> */
// const stats = fs.statSync(`${__filename}`); //works also with __dirname  //would have information about directory
// console.log(stats);

/* <----------------------------ASYNC -------------------------> */
fs.stat(__filename, (err, stats) => {
    if (err) {
        console.log("ERROR", err);
    } else {
        console.log(__filename); //stats is the return of the outer function
        console.log(stats, stats.isDirectory(), stats.isFile());
    }
});

console.log("fs.stat is slower than this line appears");
