const fs = require("fs");

/* <-----------------------PART 1 ------------------------------> */

function logSizes(path) {
    fs.readdir(
        path,
        {
            withFileTypes: true,
        },
        function (err, items) {
            if (err) {
                console.log(err);
                return;
            }
            items.forEach((item) => {
                let nextPath = `${path}/${item.name}`;
                //if item is a file we need to log it + also log the size (neet fs.stat for it)
                if (item.isFile()) {
                    fs.stat(nextPath, (err, stats) => {
                        //note: the stats is like the return!!!
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            //console.log(path + "/" + item.name + ": " + stats.size);
                            console.log(nextPath + ": " + stats.size);
                        }
                    });
                } else {
                    logSizes(nextPath);
                }
            });
        }
    );
}

logSizes(`${__dirname}/files`);

/* <-----------------------PART 2 ------------------------------> */

function mapSizes(path) {
    //create an object
    const folderObj = {};
    const items = fs.readdirSync(path, {
        withFileTypes: true,
    });
    //add a property to the object for each item
    items.forEach(function (item) {
        let nextPath = `${path}/${item.name}`;
        if (item.isFile()) {
            // add a property to the folderObj with the name whose value is the size
            // -> you get the size from calling stat sync
            if (item.name != ".DS_Store") {
                const stats = fs.statSync(nextPath);
                folderObj[item.name] = stats.size;
            }
        } else {
            //add a property to the folderObj with the name
            // +  whole value is the object you get from calling mapSizes again
            folderObj[item.name] = mapSizes(nextPath);
        }
    });
    return folderObj;
}

try {
    const obj = mapSizes(`${__dirname}/files`);
    fs.writeFileSync("filemap.json", JSON.stringify(obj, null, 4));
} catch (err) {
    console.log(err);
}

/* <-----------------------Comments ------------------------------> */

// let items = [
//     {name: 'readme.md'},
//     {name: 'part1'}
// ];
// const myObj = {};
// items.forEach(function(item) {
//     myObj[item.name] = 'whatever';
// });
