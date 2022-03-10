const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//this is done for every request! but we need next here!
app.use(function (req, res, next) {
    console.log(`Middleware says url is ${req.url}`);
    next();
});

app.use(cookieParser());

app.use(function (req, res) {
    if (!req.cookies.accepted && req.url != "/cookie") {
        //do smth
    } else {
        //do smth
    }
});

app.use(express.static("./public")); //static does not do next if smth found

app.use(
    express.urlencoded({
        //express.urlencoded makes a next!!! does not stop
        extended: false,
    })
);

app.get("/hello/world", function (req, res, next) {
    return next();
});

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

app.post("/funky/chicken.html", function (req, res) {
    console.log(req.body);
    res.send(
        `<!doctype html>
        <title>Thanks!</title>
        <p>Thanks`
    );
});

// --- FOR HOMEWORK -------------------------------------------------
app.get("/cookie", function (req, res) {
    res.send(`<!doctype html>`);
});

app.get("/form/test", function (req, res) {
    res.send(
        `<!doctype html>
        <form method="post">
        <input name="checker" type="checkbox"
        <button>submit</button>
        </form>`
    );
});

app.post("/form/test", function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
});

app.get("/redirect/spiced", function (req, res) {
    res.redirect("https://spiced.academy");
});

/*  res.cookie("url", req.url) */

app.listen(8080, () => console.log("Listening on Port 8080"));
