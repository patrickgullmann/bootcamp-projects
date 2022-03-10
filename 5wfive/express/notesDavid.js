const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

/*
res.send
res.sendFile
res.json
res.redirect
res.render
res.sendStatus
*/
app.use(cookieParser());

app.use(function (req, res) {
    if (!req.cookies.accepted && req.url != "/cookie") {
    } else {
    }
});

app.use(express.static("./public"));

app.use(function (req, res, next) {
    console.log(`middleware says url is ${req.url}`);
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/hello/world", function (req, res, next) {
    console.log(req.query, req.headers.cookie, req.cookies, req.cookies.duck);
    res.cookie("chicken", "funky", {});
    res.cookie("duck", "disco", {});
    res.send(
        `<!doctype html>
        <title>Yo World!</title>
        <p>Yo World!`
    );
});

app.get("/hello/:anything", function (req, res, next) {
    console.log(req.url, req.params.anything);
    res.sendStatus(200);
});

// app.get('/hello/:anything/:whocares/', function(req, res, next) {
//     console.log(req.url, req.params.anything);
//     res.sendStatus(200);
// });

app.get("/hello/world", function (req, res, next) {
    return next();
    // res.set('content-type', 'text/plain');
    res.send(
        `<!doctype html>
        <title>Hello World!</title>
        <p>Hello World!`
    );
});

app.get("/cookie", function (req, res) {
    res.send(`<!doctype html>`);
});

app.get("/form/test", function (req, res) {
    res.send(
        `<!doctype html>
        <form method="post">
        <input name="checker" type="checkbox">
        <button>submit</button>
        </form>`
    );
});

/*
    res.cookie('url', req.url);
*/

app.get("/redirect/spiced", function (req, res) {
    res.redirect("https://spiced.academy");
});

app.get("/redirect/helloworld", function (req, res) {
    res.redirect("/hello/world");
});

app.post("/form/test", function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
});

app.post("/funky/chicken.html", function (req, res, next) {
    console.log(req.body.whatevs);
    res.send(
        `<!doctype html>
        <title>Thanks!</title>
        <p>Thanks!`
    );
});

app.listen(8080, () => console.log(`I'm listening.`));
