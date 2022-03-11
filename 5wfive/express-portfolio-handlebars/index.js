const express = require("express");
const app = express();
const teachers = require("./data.json");

// eig eine property von zb const hb = require("express-handlebars"); -> hb.engine
const { engine } = require("express-handlebars");

// Boilerplate to allow our express server to use HB express as a template engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static("./projects")); //making sue that we are serving the static projects

app.use((req, res, next) => {
    console.log("req.url is: ", req.url);
    next();
});

app.get("/", (req, res) => {
    res.render("home", {
        //layout: "main", //müssen wir nicht machen wenn nur eines
        cohort: "Truffle",
        teachers,
        title: "HB Portfolio",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        layout: "main",
        emojis: ["🦍", "🤡", "🐸", "🐙"],
        title: "About",
    });
});

app.listen(8080, () => console.log("Listening on 8080 lol"));
