//super inportant: always name main html file to index.html
//bei mir werden immer zwei requests beim laden gemacht, wegen dem favicon icon oben

const http = require("http");
const path = require("path");
const fs = require("fs");

//const projectsDirectory = __dirname + "/projects";
const projectsDirectory = path.join(__dirname, "projects");
//console.log(projectsDirectory);

http.createServer((req, res) => {
    console.log("Request", req.url);
    req.on("error", (err) => console.log(err));
    res.on("error", (err) => console.log(err));

    //get the right filepath
    const requestedEntity = path.join(projectsDirectory, req.url);
    console.log(requestedEntity);

    //Non Get Requests
    if (req.method !== "GET") {
        //set the correc tstatus code
        //end the response
        //return
    }

    if (req.url === "/") {
        res.end(); // und dann hier machen bzw eigene Datei erstellen
    }

    //wenn jemand .. eingibt in den browser würde er ja zurückkommen und geheime files gehen
    if (!requestedEntity.startsWith(projectsDirectory)) {
        res.statusCode = 403;
        return res.end(); //bc we really need to end here
    }

    fs.stat(requestedEntity, (err, metaData) => {
        if (err) {
            res.statusCode = 404;
            res.end();
            return;
        }

        if (metaData.isFile()) {
            //setting content type headers
            const extension = path.extname(requestedEntity);

            if (extension == ".html") {
                res.setHeader("Content-Type", "text/html");
            } else {
                // .... OR AS AN OBJECT DONE AND ACCESSED
            }

            const readStream = fs.createReadStream(requestedEntity);
            readStream.on("error", (error) => {
                console.log(error);
                res.statusCode = 500;
                return res.end();
            });
            readStream.pipe(res); //ist beim readStream das res.end();
        } else {
            //ensure req.url ends with a / else redirect -> yesterday exercise -> 2 things to set
            // +
            //send over the index.html file inside of the directory
            //create a new path to the index.html file and pipe the name
        }
    });

    //REDING THE FILE
    //Note: wir machen ja die req zu index.html, daber da da andere sachen verlinkt sind machen wir
    //wenn wir an der stelle im code sind eine neue request um die daten auch zu erhalten
    // const readStream = fs.createReadStream(requestedEntity);
    // readStream.on("error", (error) => console.log(error)); //500 server error
    // readStream.pipe(res);

    // <------------ OLDER WAY: no readstream and no chunks ------>
    //Note: readfile liest die file und gibt sie im conteent als string zurück, den geben wir an den broweser
    //Note: die kommentare für Readstream passen auch hierzu!
    // fs.readFile(requestedEntity, (err, content) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     res.end(content);
    // });
}).listen(8080, () =>
    console.log("Listening on 8080 ... http://localhost:8080")
);
