var eins = document.getElementById("eins");
var zwei = document.getElementById("zwei");

eins.addEventListener("mouseover", function (e) {
    console.log(e.target);
    if (e.target == zwei) {
        console.log("Hi");
        zwei.style.backgroundColor = "blue";
    }
});

// zwei.addEventListener("click", function () {
//     console.log("hi");
// });
