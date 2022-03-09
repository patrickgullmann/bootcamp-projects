const http = require("http");
const path = require("path");
const fs = require("fs");

const homePage = require("./home-page.js");

const projectsDirectory = path.join(__dirname, "projects");
// /Users/patrickgullmann/Desktop/Spiced/truffle-code/5wfive/portfolio/projects

const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
};

http.createServer((req, res) => {
    console.log("REQUEST!", req.url);

    req.on("error", (err) => console.log(err));
    res.on("error", (err) => console.log(err));

    // Non GET requests --------------------------------------------------------
    if (req.method !== "GET") {
        res.statusCode = 405;
        return res.end();
    }

    // 🏡 Home Page -------------------------------------------------------------
    if (req.url === "/") {
        const homePageHTML = homePage.generateHomePage();
        res.end(homePageHTML);
    }

    // Construct the requested path
    const requestedEntity = path.join(projectsDirectory, req.url);
    console.log("requestedEntity:\t", requestedEntity);

    // 🚨 Directory Traversal Attacks 🚨 ----------------------------------------
    if (!requestedEntity.startsWith(projectsDirectory)) {
        res.statusCode = 403;
        return res.end();
    }

    // 🟢 Check Entity Exists ---------------------------------------------------
    fs.stat(requestedEntity, (err, metaData) => {
        if (err) {
            res.statusCode = 404;
            return res.end();
        }

        if (metaData.isFile()) {
            // Setting content type headers
            const extension = path.extname(requestedEntity);
            console.log("extension:\t", extension);
            res.setHeader("Content-Type", `${contentTypes[extension]}`);

            // SEND THE FILE (error ist 505)
            const readStream = fs.createReadStream(requestedEntity);
            readStream.on("error", (error) => console.log(error));
            readStream.pipe(res); //wie res.end()
        } else {
            //check if url ends with slash otherwise redirect
            if (req.url.charAt(req.url.length - 1) === "/" && req.url !== "/") {
                const newEntity = requestedEntity + "index.html";
                console.log("newEntity:\t", newEntity);

                //bleiben ja bei der selben request url!! nur geben andere sache zurück
                const readStream = fs.createReadStream(newEntity);
                readStream.on("error", (error) => console.log(error));
                readStream.pipe(res); //wie res.end()
            } else if (req.url !== "/") {
                res.statusCode = 301;
                res.setHeader("location", `${req.url}/`);
                res.end();
            }
        }
    });
}).listen(8080, () =>
    console.log("Listening on 8080...\n\nhttp://localhost:8080")
);
