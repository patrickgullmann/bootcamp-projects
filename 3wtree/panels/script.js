var slide = $("#slide");
var panel1 = $("#panel1");
var box = $("#box");

//mousemove in the box
slide.on("mousedown", function (e) {
    e.preventDefault();
    box.on("mousemove", function (e) {
        //console.log(e.offsetX); //WIESO gibt es hier zwei Offsetx???
        if (e.offsetX > slide.outerWidth()) {
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
