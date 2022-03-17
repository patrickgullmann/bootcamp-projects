module.exports = function fn(val) {
    if (typeof val == "string") {
        return val.split("").reverse().join("");
    } else if (typeof val == "number" && !isNaN(val)) {
        return null;
    } else if (Array.isArray(val)) {
        return [val[0].split("").reverse().join(""), null];
    } else {
        return console.log("Wup Wup Wup");
    }
};
