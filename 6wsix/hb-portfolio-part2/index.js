const express = require("express");
const app = express();
const projects = require("./projects.json");

const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// ------Code begins -----------------------------------------
app.use((req, res, next) => {
    console.log("req.url is: ", req.url);
    next();
});

app.get("/", (req, res) => {
    res.render("welcome", {
        layout: "main", //setup
        title: "Overview",
        projects,
    });
});

app.get("/projects/:project", (req, res) => {
    const project = req.params.project;
    //console.log("req.params", req.params);
    //console.log(project);
    const selectedProject = projects.find((item) => item.directory == project);
    if (!selectedProject) {
        return res.sendStatus(404);
    }

    res.render("description", {
        layout: "main", //setup
        title: "Description",
        projects,
        selectedProject,
    });
});

app.use(express.static("./projects"));
app.use(express.static("./public"));

app.listen(8080, () => console.log("Listening on 8080 with eaaaazy vibeeezzz"));
