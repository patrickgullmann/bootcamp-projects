// const fs = require("fs");
// -> müssen unten nicht immer fs schreiben mit hipster syntax!
let { readdir, stat } = require("fs");

const { promisify } = require("util");
readdir = promisify(readdir);
stat = promisify(stat);

// 3 WAYS to make logsizes an Promise obj:
// 1: promisify(need callback); 2: use promise constructor;
// 3: log sizes returns a promise it becomes a promise

//NOTE: Here not one final promise from log sizes -> need to make it

function logSizes(path) {
    readdir(path, {
        withFileTypes: true,
    })
        .then(function (items) {
            items.forEach((item) => {
                let nextPath = `${path}/${item.name}`;
                if (item.isFile()) {
                    if (item.name != ".DS_Store") {
                        stat(nextPath).then(function (stats) {
                            console.log(nextPath + ": " + stats.size);
                        });
                    }
                } else {
                    logSizes(nextPath);
                }
            });
        })
        .catch(function (err) {
            console.log(err.message, "ERROR!!!");
        });
}

logSizes(`${__dirname}/files`);

/* <------------IRRELEVANT FÜR DIE AUFGABE ----------------------> */
/* <------------PART 2 erstellt Filemap.json --------------------> */

// function mapSizes(path) {
//     //create an object
//     const folderObj = {};
//     const items = fs.readdirSync(path, {
//         withFileTypes: true,
//     });
//     //add a property to the object for each item
//     items.forEach(function (item) {
//         let nextPath = `${path}/${item.name}`;
//         if (item.isFile()) {
//             // add a property to the folderObj with the name whose value is the size
//             // -> you get the size from calling stat sync
//             if (item.name != ".DS_Store") {
//                 const stats = fs.statSync(nextPath);
//                 folderObj[item.name] = stats.size;
//             }
//         } else {
//             //add a property to the folderObj with the name
//             // +  whole value is the object you get from calling mapSizes again
//             folderObj[item.name] = mapSizes(nextPath);
//         }
//     });
//     return folderObj;
// }

// try {
//     const obj = mapSizes(`${__dirname}/files`);
//     fs.writeFileSync("filemap.json", JSON.stringify(obj, null, 4));
// } catch (err) {
//     console.log(err);
// }

/* <-----------------------Comments ------------------------------> */

// let items = [
//     {name: 'readme.md'},
//     {name: 'part1'}
// ];
// const myObj = {};
// items.forEach(function(item) {
//     myObj[item.name] = 'whatever';
// });
