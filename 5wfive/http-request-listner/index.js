const http = require("http");

const server = http.createServer(function (request, response) {
    console.log(request.method, request.url, request.headers);

    request.on("error", function (err) {
        console.log(err);
    });

    response.on("error", function (err) {
        console.log(err);
    });

    if (request.method == "HEAD") {
        response.statusCode = 200;
        response.setHeader("content-type", "text/html");
        response.end();
    } else if (request.method == "GET") {
        response.statusCode = 200;
        response.setHeader("content-type", "text/html");
        // body erstellen für die Anfrage und senden
        response.end(`<!doctype html>
        <html>
        <title>Hello World!</title>
        <p>Hello World!</p>
        </html>`);
    } else if (request.method == "POST") {
        //body erhalten und was damit machen
        let body = "";
        request
            .on("data", function (chunk) {
                body += chunk;
            })
            .on("end", function () {
                console.log(body);
            });
        response.statusCode = 302;
        response.setHeader("location", "/");
        response.end();
    } else {
        response.statusCode = 405;
        response.end();
    }
});

server.listen(8080, () => console.log("Server is listening"));
