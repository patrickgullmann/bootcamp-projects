const http = require("http");
const qs = require("querystring");
const chalk = require("chalk");

const server = http.createServer(function (request, response) {
    request.on("error", function (err) {
        console.log(err);
    });
    response.on("error", function (err) {
        console.log(err);
    });

    if (request.method == "GET") {
        //if somebody opens the local host it will be a get request to our server! We then send back to the browser "the page"
        response.statusCode = 200;
        response.setHeader("content-type", "text/html");
        response.write(`<!doctype html>
        <html>
        <title>Colors</title>
        <form method="POST">
        <input type="text" name="message" placeholder="Type something">
        <select name="color">
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="yellow">yellow</option>
            <option value="gray">gray</option>
            <option value="magenta">magenta</option>
            <option value="cyan">cyan</option>
        </select>
        <button type="submit">Go</button>
        </form>
        </html>`);
        response.end();
    }

    if (request.method == "POST") {
        //if somebody hits Go button on website(client) we get a post at our server , we sent back the hyped in in color
        let body = "";
        request.on("data", (chunk) => {
            body += chunk;
        });
        request.on("end", () => {
            response.statusCode = 200;
            response.setHeader("content-type", "text/html");
            //console.log(body); //want an object to acess it
            let parsedBody = qs.parse(body);
            console.log(chalk[parsedBody.color](parsedBody.message));
            response.write(`<!doctype html>
            <html>
            <title>Colors</title>
            <a href="/" style="color:${parsedBody.color}; font-size: 30px">${parsedBody.message}</a>
            </html>`);
            response.end();
        });
    }
});

server.listen(8080, () => console.log("Port 8080 is listening"));
