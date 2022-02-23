var inp = document.getElementById("textarea");
var txt;

inp.value = localStorage.getItem("info");

inp.addEventListener("input", function () {
    txt = inp.value; //geht nicht mit .innerHTML -> ändern wir nicht?
    localStorage.setItem("info", txt);
});
