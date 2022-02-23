function askForNumber() {
    var num = prompt("Please enter a number between 1 and 10");
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("Bad number");
}
function translateNumberToGerman() {
    try {
        var num = askForNumber();
        var str;
        if (num == 1) {
            str = "eins";
        } else if (num == 2) {
            str = "zwei";
        } else if (num == 3) {
            str = "drei";
        } else if (num == 4) {
            str = "vier";
        } else if (num == 5) {
            str = "fünf";
        } else if (num == 6) {
            str = "sechs";
        } else if (num == 7) {
            str = "sieben";
        } else if (num == 8) {
            str = "acht";
        } else if (num == 9) {
            str = "neun";
        } else if (num == 10) {
            str = "zehn";
        }
    } catch (err) {
        str = translateNumberToGerman(); //need to do it again! important -> STORE IT
    }
    return str; //könnte auch zweimal in try und catch stehen!
}

console.log(translateNumberToGerman());
