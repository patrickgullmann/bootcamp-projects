/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
app.get("/headlines", function (req, res) {
    getToken(function (err, token) {
        if (err) {
        } else {
            getToken(function (err, tweets) {});
        }
    });
});

getTweets = promisify(getTweets);

app.get("/headlines", function (req, res) {
    getToken()
        .then(function (token) {
            return getTweets(token);
        })
        .then((tweets) => {})
        .catch((err) => {});
});

// ------- AUFGABE ZU PROMISES MULTIPLE TWEET SOURCES ---------

/* after getToken we want call getTweets 3 times with new url */

app.get("/headlines", function (req, res) {
    getToken()
        .then(function (token) {
            return Promise.all([
                getTweets(token, "theonion") /*.catch() */,
                getTweets(token, "mytimes"),
                getTweets(token, "bbcnews"),
            ]);
        })
        .then(([onionTweets, nytimesTweets, bbcnewsTweets]) => {
            //all gogether make
            // arr = arr.flat();
            // OR arr = [...arr[0], ...arr[1], ...arr[2]]

            //then sort them -> use a pair a and b
            arr.sort(function (a, b) {
                return a - b; //compares the two and looks which come first
            });
            arr.sort(function (a, b) {
                return Math.random() > 0.5 ? -1 : 1;
            });
            //sort by timestamp! will be a string createdSmth = "2020-12-23"
            //pass it to object new Date(createdSmth)
            // +new Date(createdSmth) now a number (will be automatically)
            //compare new Date(created_at) - new Date()
            arr.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at);
            });
        })
        .catch((err) => {});
});

//note: if one fails all go in the catch! but if you handle seperatly it will still work
