/* eslint-disable no-empty */

// 1. durch array loopen einfach mit for Schleife
// und durch Object mit key in Object
// 2. nimmt array und gibt nen revArray back ABER der erste soll noch existieren! der erste soll bleiben
// 3. könnt filter suchen nutzen aber selber mit nem for loop schreiben

// AUFGABE 2

function reverse(arr) {
    var revArr = arr.slice();
    revArr.reverse();
    return revArr;
}

var originalArray = [1, 2, 3];
var reversedArray = reverse(originalArray);

console.log(originalArray); // [1, 2, 3]
console.log(reversedArray); // [3, 2, 1]

// AUFGABE 3

function getLessThanZero(arr) {
    var newArr = arr.filter((a) => a < 0);
    return newArr;
}

console.log(getLessThanZero([1, 2, -1, -90, 10]));
console.log(getLessThanZero([1, 2]));

//Aufgabe 1

function each(arg, fn) {
    if (Array.isArray(arg)) {
        for (var i = 0; i < arg.length; i++) {
            fn(arg[i], i);
        }
    } else {
        for (var propName in arg) {
            fn(arg[propName], propName);
        }
    }
}

each(
    {
        a: 1,
        b: 2,
    },
    function (val, name) {
        console.log("The value of " + name + " is " + val);
    }
); // logs 'the value of a is 1' and 'the value of b is 2'

each(["a", "b"], function (val, idx) {
    console.log("The value of item " + idx + " is " + val);
}); // logs 'the value of item 0 is a' and 'the value of item 1 is b'
