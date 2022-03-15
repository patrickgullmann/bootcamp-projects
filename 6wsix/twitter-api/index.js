const express = require("express");
const app = express();
const { getToken, getTweets, formatTweets } = require("./twitter");

app.use(express.static("./public"));

app.get("/data.json", function (req, res) {
    // BC ASYNCHRONUS -> need CALLBACK functions
    getToken(function (err, token) {
        if (err) {
            res.sendStatus(500);
        } else {
            // I have the token -> next function
            getTweets(token, function (err, tweets) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    //formating tweets -> can be synchronious
                    const tickerTweets = formatTweets(tweets);
                    res.json(tickerTweets);
                }
            });
        }
    });

    //note -> we need to deleta old DATA file -> bc we serve it with this here
});

app.listen(8080, () => console.log("I'm listening on 8080"));

// --- TESTEN DER EINZELNEN FUNKTIONEN --------------------------->

// getToken(function (err, token) {
//     if (err) {
//         console.log("ERROR", err.message);
//     } else {
//         console.log(token);
//     }
// });

// getTweets(
//     "AAAAAAAAAAAAAAAAAAAAAOtRwgAAAAAAl12EvpH0yHfsewZLFx2cVZevGjc%3D1N6gfa6mL6MtLfX6hRFCxxNOuu2VbQllph2BEmCcP47WCLUv4d",
//     function (err, smth) {
//         if (err) {
//             console.log("ERROR", err.message);
//         } else {
//             console.log(smth);
//         }
//     }
// );
