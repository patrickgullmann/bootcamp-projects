const express = require("express");
const app = express();
let { getToken, getTweets, formatTweets } = require("./twitter");
const util = require("util");

getToken = util.promisify(getToken);
getTweets = util.promisify(getTweets);

app.use(express.static("./public"));

app.get("/data.json", function (req, res) {
    getToken()
        .then(function (token) {
            return Promise.all([
                getTweets(token, "theonion"),
                getTweets(token, "nytimes"),
                getTweets(token, "bbcnews"),
            ]);
        })
        .then((tweets) => {
            //Anpassung des Arrays: Glätten, Namen dazu + Sortieren in formatTweets
            res.json(formatTweets(tweets));
        })
        .catch((err) => {
            console.log(err.message);
            res.sendStatus(500);
        });
});

app.listen(8080, () => console.log("I'm listening on 8080"));

// --- ANDERE OPTION --------------------------->

// getToken()
//     .then((token) => getTweets(token))
//     .then((tweets) => res.json(formatTweets(tweets)))
//     .catch((err) => console.log(err.message));
