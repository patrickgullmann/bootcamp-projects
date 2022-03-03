const url = require("url");
const qs = require("querystring");
let inputUrl = process.argv[2];

let parsedInputUrl = url.parse(inputUrl);

// console.log(inputUrl);
// console.log(parsedInputUrl);

let output = `The protocol is ${parsedInputUrl.protocol}
The host is ${parsedInputUrl.host}
The hostname is ${parsedInputUrl.hostname}
The port is ${parsedInputUrl.port}
The pathname is ${parsedInputUrl.pathname}
The query is ${parsedInputUrl.query}`;

//wenn kein query dann einfach ausgeben
if (parsedInputUrl.query === null) {
    console.log(output);
} else {
    //wenn query diesen bekommen und dynamisch dazu
    let query = parsedInputUrl.query;
    let parsedQuery = qs.parse(query);

    for (var key in parsedQuery) {
        output += `
The value of the ${key} parameter is ${parsedQuery[key]}`;
    }
    console.log(output);
}
