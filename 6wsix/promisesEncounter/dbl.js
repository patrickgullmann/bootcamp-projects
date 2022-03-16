module.exports = (n) =>
    new Promise((rslv, rjct) =>
        setTimeout(
            () => (isNaN(n) ? rjct(new Error("Bad number")) : rslv(n * 2)),
            2000
        )
    );

// module.exports = function(n) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             if (isNaN(n)) {
//                 reject(new Error('Bad number'));
//             } else {
//                 resolve(n * 2);
//             }
//         }, 2000);
//     });
// }

//const {readdir} = require('fs').promises;

let { readdir } = require("fs");
let { promisify } = require("util");

readdir = promisify(readdir);

// function readdir(path, options) {
//     return new Promise(function(resolve, reject) {
//         readdir(path, options, function(err, items) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(items);
//             }
//         });
//     });
// }

// function getUrl(url) {
//     if (!url) {
//         return Promise.reject();
//     }
//     return makeNetworkRequest(url);
// }
