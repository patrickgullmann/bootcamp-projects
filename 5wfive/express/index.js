const express = require("express");
const app = express(); //like "createServer" in Portfolio proj (more clean)

/*
res.send
res.set (-> adds atuomatically the 200 code and the content type html header)
res.sendFile (-> does a readstream)
res.json 
res.redirect
res.render
res.sendStatus
*/

//placeholder parameter works for everthing behind -> hello/world would also go here, 
//but if we move this in the code behind hello world this would come first
app.get("/hello/:something", function (req, res) {
    console.log(req.url, req.params.something);
    res.sendStatus(200);
});

//Express loops over all routes e.g. .get .push .....
//loooks now for get methods with this url and if found execute it
app.get("/hello/world", function (req, res, next) {
    return next();
    // res.send(
    //     `<!doctype html>
    //     <title>Hello World!</title>
    //     <p>Hello World!`
    // );
});

//always looks for the one before in the code ->
//never execute this one EXCEPT there is a next in the one before
app.get("/hello/world", function (req, res) {
    res.send(
        `<!doctype html>
        <title>Yo World!</title>
        <p>Yo World!`
    );
});

app.listen(8080, () => console.log("Listening on Port 8080"));
