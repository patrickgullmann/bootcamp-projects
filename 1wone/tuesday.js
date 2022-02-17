/* eslint-disable no-unused-vars */
function logType(argument) {
    if (typeof argument == "undefined") {
        console.log("undefined!");
    } else if (argument === null) {
        console.log("null!");
    } else if (typeof argument === "number" && Number.isNaN(argument) != true) {
        console.log("number!");
        //Konvertieren verhindern
    } else if (Number.isNaN(argument)) {
        console.log("not a number!");
    } else if (typeof argument === "string") {
        console.log("string!");
    } else if (typeof argument === "boolean") {
        console.log("boolean!");
    } else if (typeof argument === "bigint") {
        console.log("bigint!");
    } else if (typeof argument === "function") {
        console.log("function!");
    } else if (
        typeof argument === "object" &&
        Array.isArray(argument) != true
    ) {
        console.log("object!");
    } else if (Array.isArray(argument)) {
        console.log("array!");
    } else {
        console.log("I have no idea!");
    }
}

//var c = [];
//logType(c);

//console.log(isNaN(13));

//console.log(typeof c);

var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA",
};

var b = {};

for (var propertyKey in a) {
    //console.log(propertyKey);
    //console.log(a[propertyKey]);
    b[a[propertyKey]] = propertyKey;
    //b.a[propertyKey] = propertyKey; //geht nicht da dynamisch und Variable!! deshalb Klammern
}

console.log(b);

for (var i = 10; i > 0; i--) {
    console.log(i);
}
