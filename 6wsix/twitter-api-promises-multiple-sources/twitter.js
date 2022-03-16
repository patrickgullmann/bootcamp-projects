const https = require("https");
const { twitterKey, twitterSecret } = require("./secrets");

const authorization = `Basic ${Buffer.from(
    twitterKey + ":" + twitterSecret
).toString("base64")}`;

//console.log(twitterKey, twitterSecret);
//console.log(authorization);

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

exports.getTweets = function (token, source, callback) {
    const req = https.request(
        {
            method: "GET",
            host: "api.twitter.com",
            path: `/1.1/statuses/user_timeline.json?tweet_mode=extended&screen_name=${source}`,
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
                    //BODY sind die TWEETS!!
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
    // --- NEW PART: FLAT + SORT BY DATE -------------------------
    tweets = tweets.flat();
    //console.log(tweets.length);

    tweets.sort(function (a, b) {
        return new Date(a.created_at) - new Date(b.created_at);
    });
    // --- NEW PART: END ------------------------------------------

    const lessTweets = tweets.filter(
        (tweet) => tweet.entities.urls.length === 1
    );

    let reducedInfoTweets = [];
    for (let i in lessTweets) {
        reducedInfoTweets.push({
            title: lessTweets[i].full_text,
            url: lessTweets[i].entities.urls[0].url,
        });

        reducedInfoTweets[i].title = reducedInfoTweets[i].title.replace(
            reducedInfoTweets[i].url,
            ""
        );

        if (lessTweets[i].entities.media) {
            reducedInfoTweets[i].title = reducedInfoTweets[i].title.replace(
                lessTweets[i].entities.media[0].url,
                ""
            );
        }

        // --- NEW PART: ADD NEWS SOURCE -------------------------
        reducedInfoTweets[i].title =
            reducedInfoTweets[i].title + `(News: ${lessTweets[i].user.name})`;
        // --- NEW PART: END ------------------------------------------
    }

    // die ersten 8 stehen lassen: auf 8 reduzieren (myChoise!!)
    // if (reducedInfoTweets.length >= 8) {
    //     reducedInfoTweets.splice(8, reducedInfoTweets.length - 8);
    // }

    return reducedInfoTweets;
};
