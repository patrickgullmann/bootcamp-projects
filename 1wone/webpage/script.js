var overlay = document.getElementsByClassName("overlay")[0];
var sideNav = document.getElementsByClassName("side-nav")[0];
var burger = document.getElementById("burger");
var x = document.getElementsByClassName("x")[0];

console.log(overlay);
console.log(sideNav);
console.log(burger);
console.log(x);

burger.addEventListener("click", function () {
    //console.log("move click is happening!");
    overlay.style.visibility = "visible"; // betrifft auch side bar da ja overlay vererbt*/
    sideNav.classList.add("on");
});

//Schwarzer Kasten Klick
overlay.addEventListener("click", function () {
    overlay.style.visibility = "hidden";
    sideNav.classList.remove("on");
});

//Unterbinden
sideNav.addEventListener("click", function (e) {
    e.stopPropagation();
});

//X Klick
x.addEventListener("click", function (e) {
    e.stopPropagation();
    overlay.style.visibility = "hidden";
    sideNav.classList.remove("on");
});
