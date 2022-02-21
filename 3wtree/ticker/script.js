(function () {
    var headlines = $("#headlines");
    var links = $("a"); //var links = headlines.find("A");
    var reqId;

    var left = headlines.offset().left;

    function moveHeadlines() {
        left--;

        if (left == -links.first().outerWidth()) {
            left += links.eq(0).outerWidth(); // links.first().outerWidth() //.width() one padding
            links.eq(0).appendTo(headlines);
            links = $("a"); //we have to set the links again to current thing
            //IMPORTANT -> not a jQuery thing!! IN the old exercise we used get elementsbytagName
            //there it stays in order ... if we would have used querySelectorAll we would also needed to
            //do this again to "Reset" the links to current situation
        }

        headlines.css({
            left: left + "px",
        });

        reqId = requestAnimationFrame(moveHeadlines);
    }

    moveHeadlines();

    //no need to looooop again, -> einfacher mit jQuery
    links.on("mouseenter", function (e) {
        cancelAnimationFrame(reqId);
        //e.target.style.color = "blue";
        $(e.target).css({
            color: "blue",
        });
    });

    links.on("mouseleave", function (e) {
        moveHeadlines();
        //e.target.style.color = "-webkit-link";
        $(e.target).css({
            color: "-webkit-link",
        });
    });
})();
