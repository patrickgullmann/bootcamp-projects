var slide = $("#slide");
var panel1 = $("#panel1");
var box = $("#box");

//mousemove in the box
slide.on("mousedown", function (e) {
    e.preventDefault();
    box.on("mousemove", function (e) {
        //console.log(e.target); //WIESO gibt es hier zwei Offsetx??? -> weil manchmal ja Bild und manchmal Bar das Target
        // $(e.target) == slide funktioniert nicht, da bei jQuery unterschiedliche Objekte die auf selbes referenzen; bei normalen (ohne jQuery hätte funktioniert)
        if ($(e.target)[0] != slide[0]) {
            //if (e.target.id != "slide") { //hätte auch funktioniert und einfacher
            slide.css({
                left: e.offsetX + "px",
            });
            panel1.css({
                width: e.offsetX + "px",
            });
        }
    });
});

slide.on("mouseup", function (e) {
    e.preventDefault();
    box.off("mousemove");
});

// var slide = document.getElementById("slide");
// var panel1 = document.getElementById("panel1");
// var box = document.getElementById("box");

// //mousemove in the box
// slide.addEventListener("mousedown", function (e) {
//     e.preventDefault();
//     box.addEventListener("mousemove", function (e) {
//         if (e.offsetX > slide.offsetWidth) {
//             slide.style.left = e.offsetX + "px";
//             panel1.style.width = e.offsetX + "px";
//         }
//     });
// });

// slide.addEventListener("mouseup", function (e) {
//     e.preventDefault();
//     box.removeEventListener("mousemove", function (e) {
//         if (e.offsetX > slide.offsetWidth) {
//             slide.style.left = e.offsetX + "px";
//             panel1.style.width = e.offsetX + "px";
//         }
//     });
// });
