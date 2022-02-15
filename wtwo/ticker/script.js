// headlines.appendChild(document.getElementsByTagName("a")[0]) //the appendchild also removes it

(function () {
    var headlines = document.getElementById("headlines"); //headline erhalten (in tickert mit allen a's)
    var links = document.getElementsByTagName("a"); //alle a's in einer Liste bekommen
    var reqId;

    var left = headlines.offsetLeft;

    // console.log("headlines: ", headlines);
    // console.log("left position of headlines: ", left);
    // console.log("links: ", links);

    function moveHeadlines() {
        left--;

        /*offSetWidth zeigt an wie groß ein element draußen ist IMMER GLEICH GROß*/
        //hier rein wenn so weiß draußen wie element lang
        if (left == -links[0].offsetWidth) {
            left += links[0].offsetWidth; //dass nicht 2 "nach vorne zu dem -position wo 1 war" springt left auf 0px setzen! da 2 aktuell an der stelle
            headlines.appendChild(links[0]); //ersten nehmen und hinter hauen
        }

        /*without this it would not move bc left is just a number*/
        headlines.style.left = left + "px";
        //console.log("left value after decrementing: ", left);
        reqId = requestAnimationFrame(moveHeadlines); //ist wie eine Schleife
    }

    moveHeadlines();

    //GANZ WICHTIG:
    //for Schleife läuft einmal zu Beginn durch deshalb geht links[i].style.color nicht mehr
    //da es nicht an der Stelle des i ist da i schon einmal durchgelaufen und größer als length
    //aber ein einzelnes "hardcoded" mit links[3] würde gehen, mahct aber keinen Sinn
    //nur der eventlistener schaut ob was passiert und löst "nach seite laden" etwas aus
    for (var i = 0; i < links.length; i++) {
        console.log(links[i]);

        links[i].addEventListener("mouseenter", function (e) {
            console.log("in at: ", e.target);
            //1.stop the ticker - cancel animation frame
            cancelAnimationFrame(reqId);
            //2. update the style
            e.target.style.color = "blue";
        });

        links[i].addEventListener("mouseleave", function (e) {
            console.log("OUT at: ", e.target);
            //1. restart the ticker with function
            moveHeadlines();
            //2. update the style back
            e.target.style.color = "-webkit-link";
        });
    }
})();

// var reqId;

// function moveHeadlines() {
//     console.log("hi");
//     //console.log(requestAnimationFrame(moveHeadlines)); //will give you a number how many times
//     reqId = requestAnimationFrame(moveHeadlines);
// }

// moveHeadlines();

// cancelAnimationFrame(reqId); //so Pause it at a certain time
// //BUT to restart you need to call the function again!!! not request
