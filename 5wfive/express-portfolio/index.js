const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(cookieParser());

app.use(function (req, res, next) {
    console.log(req.url); //we always go here, so need a next in the else

    if (!req.cookies.accepted && req.url != "/cookie") {
        res.cookie("requestedUrl", req.url);
        res.redirect("/cookie");
    } else {
        next();
    }
});

app.get("/cookie", function (req, res) {
    res.send(
        `<!doctype html>
        <h1>Do you accept the Cookies for this page?</h1>
        <form method="post">
        <input name="checker" type="checkbox">
        <button>submit</button>
        </form>`
    );
});

app.post("/cookie", function (req, res) {
    if (req.body.checker) {
        res.cookie("accepted", "yes");
        res.redirect(req.cookies.requestedUrl);
        res.sendStatus(200);
    } else {
        res.send(
            `<!doctype html>
            <h1>You didnt accept the cookies, no access</h1>`
        );
    }
    //console.log(req.body); //url encode
});

app.use(express.static("./projects"));

app.listen(8080, () => console.log("Listening on 8080"));
