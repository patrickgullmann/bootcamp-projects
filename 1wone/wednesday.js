//Aufgabe 1
function sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum = sum + arguments[i];
    }
    return sum;
}

// var c = sum(5, 30, 400, 500);
// console.log(c);

//Aufgabe 2
function waitThenRun(arg) {
    setTimeout(arg, 1500);
}

// waitThenRun(function () {
//     console.log("Hello!");
//     waitThenRun(function () {
//         console.log("Goodbye!");
//     }); // logs 'Goodbye!' 1.5 seconds later
// }); // logs 'Hello!' 1.5 seconds later

//Aufgabe 3
function specMulti(number) {
    if (typeof number != "number" || Number.isNaN(number) === true) {
        return "ERROR";
    } else if (number <= 0) {
        return "ERROR";
    } else if (number >= 1000000) {
        return number;
    } else {
        number = number * 10;
        return specMulti(number); //unwinding: on the "bottom - last call" the return is
        //to the pre-last function it is calling and returns there and this returns again up
        //meaning all the returns are waiting for the bottom return!!! "cascading" -> returns wait for returns
    }
    // if (typeof number != "number" || Number.isNaN(number) === true) {
    //     return "ERROR";
    // } else if (number <= 0) {
    //     return "ERROR";
    // }
    // while (number < 1000000) {
    //     number = number * 10;
    // }
    // return number;
}

//console.log(specMulti(8));
