const http = require("http");

const server = http.createServer(function (request, response) {
    //Note: wenn wir das über den browser (nicht postman) machen, dann ist das erste laden bereits eine get request
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
    }

    if (request.method == "GET") {
        response.statusCode = 200;
        response.setHeader("content-type", "text/html");
        // body erstellen für die Anfrage und senden
        response.end(`<!doctype html>
        <html>
        <title>Hello World!</title>
        <p>Hello World!</p>
        </html>`);
    }

    if (request.method == "POST") {
        response.statusCode = 302;
        //Anmerkung: nächste zeile führt direkt/sofort ein redirect durch d.h. eine get request -> Anzeige in Postman bezieht sich auf diese
        response.setHeader("location", "/");
        //body erhalten und was damit machen
        let body = "";
        request
            .on("data", function (chunk) {
                body += chunk;
            })
            .on("end", function () {
                console.log(body);
            });
        response.end();
    }

    if (
        request.method != "HEAD" ||
        request.method != "GET" ||
        request.method != "POST"
    ) {
        response.statusCode = 405;
        response.end();
    }
});

server.listen(8080, () => console.log("Server is listening"));
