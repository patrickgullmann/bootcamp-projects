const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const basicAuth = require("basic-auth");

//just the function ... need to find a good place in the code for it
const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!creds || creds.name != "discoduck" || creds.pass != "123") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

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

//könnten auch vor dem cookie check machen! aber machen danach
//Anmerkung: Browser merkt sich das für ne kurze Zeit das pw!! 
//try it in private browser da wird nicht gemerkt
app.use("/spotify", auth);

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
