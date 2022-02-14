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

        if (left <= -links[0].offsetWidth) {
            /*offSetWidth zeigt an wie weit ein element draußen ist*/
            console.log("first link is offscreen!");
            // once the first links is completely offscreen, you'll need to take THAT link and make it the last link - send it to the back of the queue!
            left += links[0].offsetWidth;
            headlines.appendChild(links[0]);
            // there are 2 things you need to do in here!!
            // #1 - to avoid jumpiness behaviour, make sure that you account for the space that you're about to remove by adding the width of the link you're removing as the new value of left
            // #2 - remove the first link and make it the last link! add it to the end of the queue!
        }

        headlines.style.left = left + "px";
        console.log("left value after decrementing: ", left);

        requestAnimationFrame(moveHeadlines);
    }

    moveHeadlines();
})();
