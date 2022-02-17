(function () {
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");

    //Kopf
    c.strokeStyle = "black";
    c.lineWidth = 4;
    c.beginPath();
    c.arc(250, 75, 45, 0, Math.PI * 2);
    c.fillStyle = "orange";
    c.fill();
    c.stroke();

    //Körper + linker Fuß in einem
    c.strokeStyle = "black";
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(250, 120); //y Achse inkl Radius
    c.lineTo(250, 300);
    c.lineTo(160, 450);
    c.stroke(); //muss nicht jedes mal stroke

    //Rechter Fuß
    c.strokeStyle = "black";
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(250, 300); //y Achse inkl Radius
    c.lineTo(340, 450);
    c.stroke();

    //Arme (auch 2 in 1)
    c.strokeStyle = "black";
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(100, 130);
    c.lineTo(250, 220);
    c.lineTo(400, 130);
    c.stroke();

    c.strokeStyle = "black";
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(250, 145);
    c.lineTo(150, 375);
    c.lineTo(350, 375);
    c.closePath();
    c.stroke();
    c.fillStyle = "grey";
    c.fill();

    // var i = 0;
    // document.addEventListener("click", function () {
    //     //console.log(e);
    //     i++;
    //     canvas.style.top = i + "px";
    //     canvas.style.left = i + "px";
    // });
})();
