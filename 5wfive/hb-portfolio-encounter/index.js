const express = require("express");
const app = express();
const teachers = require("./data.json");

app.locals.helpers = {
    stressImportance(str) {
        return str.toUpperCase();
    },
};

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
        btnText: "Click the home btn",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        layout: "main",
        emojis: ["🦍", "🤡", "🐸", "🐙"],
        title: "About",
        btnText: "Click the about btn",
        //only for about! but you can make it globally
        helpers: {
            stressImportanceSmth(str) {
                return str.toUpperCase();
            },
        },
    });
});

//adding a dynamic route
app.get("/about/:demo", (req, res) => {
    console.log("req.params", req.params);
    res.send("<h1> DEMO </h1>");
});

app.listen(8080, () => console.log("Listening on 8080 lol"));
