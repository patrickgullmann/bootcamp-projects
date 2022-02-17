var box = document.getElementsByClassName("div")[0];

box.addEventListener("mousedown", function () {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var color = "rgb(" + red + ", " + green + ", " + blue + ")";
    box.style.backgroundColor = color; //oder mit e.target und e in funktion
});

box.addEventListener("mouseup", function () {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var color = "rgb(" + red + ", " + green + ", " + blue + ")";
    box.style.backgroundColor = color; //oder mit e.target und e in funktion
});


