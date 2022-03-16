const https = require("https");
const { twitterKey, twitterSecret } = require("./secrets");

const authorization = `Basic ${Buffer.from(
    twitterKey + ":" + twitterSecret
).toString("base64")}`;

//WHY NOT CHANGE THE CALLBACKS HERE INSIDE -> need a PROMISIFY Constructor
// + promisify the function it gets passed (in other file) needs a node callback style function here
exports.getToken = function (callback) {
    const req = https.request(
        {
            method: "POST",
            host: "api.twitter.com",
            path: "/oauth2/token",
            headers: {
                authorization: authorization,
                "content-type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        },
        function (res) {
            if (res.statusCode != 200) {
                return callback(new Error(res.statusCode));
            } else {
                let body = "";
                res.on("data", (chunk) => (body += chunk));
                res.on("end", () => {
                    try {
                        body = JSON.parse(body);
                        callback(null, body.access_token);
                    } catch (err) {
                        callback(err);
                    }
                });
                res.on("error", callback);
            }
        }
    );
    req.end("grant_type=client_credentials");
};

exports.getTweets = function (token, callback) {
    const req = https.request(
        {
            method: "GET",
            host: "api.twitter.com",
            path: "/1.1/statuses/user_timeline.json?tweet_mode=extended&screen_name=theonion",
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
        function (res) {
            let body = "";
            res.on("data", (chunk) => (body += chunk));
            res.on("end", () => {
                try {
                    body = JSON.parse(body);
                    callback(null, body);
                } catch (err) {
                    callback(err);
                }
            });
            res.on("error", callback);
        }
    );
    req.end();
};

exports.formatTweets = function (tweets) {
    const lessTweets = tweets.filter(
        (tweet) => tweet.entities.urls.length === 1
    );

    let reducedInfoTweets = [];
    for (let i in lessTweets) {
        reducedInfoTweets.push({
            //innerhalb des ArrayObjects suchen
            title: lessTweets[i].full_text,
            url: lessTweets[i].entities.urls[0].url,
        });

        //einmal die eine Url aus Text nehmen (Fehler in Twitter)
        reducedInfoTweets[i].title = reducedInfoTweets[i].title.replace(
            reducedInfoTweets[i].url,
            ""
        );

        //Video url aus dem Text nehmen (Fehler in Twitter -> Schau der ist unter Entities Media gespeichert)
        //if weil manche ja kein Media haben sonst errror und nur bei denen Replacen
        if (lessTweets[i].entities.media) {
            reducedInfoTweets[i].title = reducedInfoTweets[i].title.replace(
                lessTweets[i].entities.media[0].url,
                ""
            );
        }
    }

    // die ersten 8 stehen lassen: auf 8 reduzieren (myChoise!!)
    if (reducedInfoTweets.length >= 8) {
        reducedInfoTweets.splice(8, reducedInfoTweets.length - 8);
    }

    return reducedInfoTweets;
};
