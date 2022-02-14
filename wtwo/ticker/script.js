// headlines.appendChild(document.getElementsByTagName("a")[0]) //the appendchild also removes it

(function () {
    var headlines = document.getElementById("headlines"); //headline erhalten (in tickert mit allen a's)
    var links = document.getElementsByTagName("a"); //alle a's in einer Liste bekommen

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
        requestAnimationFrame(moveHeadlines); //ist wie eine Schleife
    }

    moveHeadlines();
})();
