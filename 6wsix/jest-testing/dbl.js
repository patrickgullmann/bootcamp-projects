//dbl.js
module.exports.dbl = function dbl(n) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (isNaN(n)) {
                reject("bad number cannot double");
            } else {
                resolve(n * 2);
            }
        }, 4000);
    });
};
