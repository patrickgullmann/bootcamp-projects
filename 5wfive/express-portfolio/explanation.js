const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//middleware können wir auch nur für bestimmten bereich laufen lassen z.b.
app.use("/hello", function (req, res, next) {
    console.log("Hello");
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(cookieParser()); //brauchen wir immer

// app.use(function (req, res) {
//     if (!req.cookies.accepted && req.url != "/cookie") {
//         //do smth
//     } else {
//         //do smth
//     }
// });

app.get("/form/test", function (req, res) {
    res.send(
        `<!doctype html>
        <form method="post">
        <input name="checker" type="checkbox">
        <button>submit</button>
        </form>`
    );
});

app.post("/form/test", function (req, res) {
    console.log(req.body); //for this you need url encode
    res.sendStatus(200);
});

app.get("/hello/world", function (req, res, next) {
    console.log(
        req.query, //this one is for ?type=text etc.
        "//",
        req.headers.cookie, //cookies immer aus browser löschen
        "//",
        req.cookies,
        "//",
        req.cookies.duck,
        "//",
        req.cookies.accepted
    );
    if (req.cookies.chicken) {
        console.log("True");
    } else {
        console.log("False");
    }
    res.cookie("chicken", "funky", {});
    res.cookie("duck", "disco", {});
    res.cookie("waht", "dillllllsco", {});
    res.send(
        `<!doctype html>
        <title>Yo World!</title>
        <p>Yo World!`
    );
});

app.get("/redirect/spiced", function (req, res) {
    res.redirect("https://spiced.academy");
});

app.use(express.static("./projects"));

app.listen(8080, () => console.log("Listening on 8080"));

/*
    res.cookie('url', req.url);
*/
