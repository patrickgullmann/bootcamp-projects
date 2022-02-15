var bigBox = document.getElementsByClassName("div")[0];
var smallBox = document.getElementsByClassName("para")[0];

bigBox.addEventListener("click", function () {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var color = "rgb(" + red + ", " + green + ", " + blue + ")";
    bigBox.style.backgroundColor = color; //oder mit e.target und e in funktion
});

smallBox.addEventListener("click", function (e) {
    e.stopPropagation(); //in die innere rein
    //als "One-Liner geschrieben"
    smallBox.style.backgroundColor =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ")"; //oder mit e.target und e in funktion
});
