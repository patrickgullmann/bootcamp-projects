var inp = document.getElementById("textarea");
var button = document.getElementById("button");
var txt;

inp.addEventListener("input", function () {
    txt = inp.value; //geht nicht mit .innerHTML -> ändern wir nicht?
});

button.addEventListener("click", function () {
    try {
        JSON.parse(txt); //String muss in Textfeld mit innerhalb von "" geschrieben werden, da ja sonst keiner
        alert("Yeah!!! JSON parse worked");
    } catch (err) {
        alert("Oh, noo!!! JSON parse didn't work");
    }
});
