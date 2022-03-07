const http = require("http");

//now we have created a server on my computer -> just created it
//method is get //url is what is in the browser behind 8080 //also see the headers
const server = http.createServer(function (request, response) {
    console.log(
        "request received",
        request.method,
        request.url
        //request.headers
    );

    request.on("error", function (err) {
        console.log(err);
    });

    response.on("error", function (err) {
        console.log(err);
    });

    //send a body zu der get anfrage
    if (request.method == "GET") {
        response.statusCode = 200;
        response.setHeader("content-type", "text/html");
        // response.write(`<!doctype html>
        // <title>my page!</title>
        // <h1> Hello World </h1>`);
        response.end(`<!doctype html>
        <title>my page!</title>
        <h1> Hello World </h1>
        <form method = "POST">
        <textarea name = "text"></textarea>
        <button>submit</button>
        </form>`);

        // if (request. url == "/funkychicken") {
        //     //do smth
        // } else if (request == "discoduck") {
        //     //do smth else
        // }
    }

    //einfach falls wir auf der seite etwas haben was jemand senden kann -> zb ne form und
    // er/sie klickt auf submit wird das ja gepostet und der

    //handhaben wenn jemand was postet, also was erhält
    if (request.method == "POST") {
        let body = "";
        request.on("data", function (chunk) {
            //console.log(chunk);
            body += chunk;
        });
        //können das erhaltene einfach auf der console ausgeben //haben das über die form erhalten
        request.on("end", function () {
            console.log(body);
        });

        response.statusCode = 200;
        response.setHeader("content-type", "text/html");
        response.end(`<!doctype html>
        <title>thanks</title>
        <h1> Thanks </h1>`);
        console.log("hiii");
    }
});

// server.on("request", function (req,res){
//     //basically this is the origanally -> add an event handler if somebody sends a request
//     //and then do smth with the request
// });

//but server needs to listen to receive smth -> it needs a port e.g. now listen to
server.listen(8080, () => console.log("I am listening"));
