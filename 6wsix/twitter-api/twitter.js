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
        //this is the response (of the POST request) from twitter,
        //not the callback we define above
        //NOTE: POST req is normal to get smth to process with -> really just POST smth is a PUT request
        function (res) {
            if (res.statusCode != 200) {
                return callback(new Error(res.statusCode));
            } else {
                let body = "";
                res.on("data", (chunk) => (body += chunk));
                res.on("end", () => {
                    try {
                        body = JSON.parse(body);
                        //hier kann dann callback was damit machen
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
                    //BODY sind die TWEETS!! Arr mit 20 Tweets Data drin
                    //console.log(body);
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

    //console.log(reducedInfoTweets);

    return reducedInfoTweets;
};

// ------ COMMENTS: ---------------------------------------------->

// const req = https.request(
//     {
//         method: "GET", //we can also make POST
//         host: "spicedify.herokuapp.com",
//         path: "/spotify?q=madonna&type=artist",
//     },
//     (res) => {
//         let body = "";
//         res.on("data", (chunk) => (body += chunk))
//             .on("end", () => console.log(body))
//             .on("error", (err) => console.log(err));
//     }
// );

// req.end(); //we also can add smth when we send

//for this exercise we need a post request -> with key + secret
//get back a token!
//in other get requests we need the token to get the tweets
