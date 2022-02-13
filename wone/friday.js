//Aufgabe 1

function Rectangle(w, h) {
    this.width = w;
    this.height = h;
}

Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};

function Square(n) {
    this.width = n;
    this.height = n;
}

Square.prototype = Object.create(Rectangle.prototype); //nochmal nachlesen
Square.prototype.constructor = Square;

var r = new Rectangle(4, 5);
var s = new Square(10);

console.log(r.getArea());
console.log(s.getArea());

// Aufgabe 2
function invertCase(str) {
    var newStr = "";
    for (var i = 0; i < str.length; i++) {
        var letter = str.charAt(i);
        if (letter == letter.toUpperCase()) {
            //T = T oder t =T bei erstem klein machen, bei zweitem nicht rein
            newStr += letter.toLowerCase();
        } else if (letter == letter.toLowerCase()) {
            newStr += letter.toUpperCase();
        } else {
            newStr += letter;
        }
    }
    return newStr;
}

console.log(invertCase("Test 123 fEsT FETT!"));
