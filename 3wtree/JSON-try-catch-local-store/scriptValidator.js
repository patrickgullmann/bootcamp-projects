var inp = document.getElementById("textarea");
var button = document.getElementById("button");
var txt;

inp.addEventListener("input", function () {
    txt = inp.value; //geht nicht mit .innerHTML -> ändern wir nicht?

    //in jQuery wesentlich kürzer
    //$(".json").remove();
    //$(".noJson").remove();

    var elem = document.getElementsByClassName("json");
    while (elem[0]) {
        elem[0].parentNode.removeChild(elem[0]);
    }
    elem = document.getElementsByClassName("noJson");
    while (elem[0]) {
        elem[0].remove(); //Option 2
    }
});

button.addEventListener("click", function () {
    try {
        JSON.parse(txt); //String muss in Textfeld mit innerhalb von "" geschrieben werden, da ja sonst keiner
        //alert("Yeah!!! JSON parse worked");
        var notification = document.createElement("div");
        notification.classList.add("json");
        notification.innerHTML = "Yeah!!! JSON parse worked";
        document.body.appendChild(notification);
    } catch (err) {
        // alert("Oh, noo!!! JSON parse didn't work");
        notification = document.createElement("div");
        notification.classList.add("noJson");
        notification.innerHTML = "Oh, noo!!! JSON parse didn't work";
        document.body.appendChild(notification);
    }
});
