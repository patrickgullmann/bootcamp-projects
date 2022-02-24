(function () {
    var headlines = $("#headlines");
    var links = $("a");
    var reqId;
    var left = headlines.offset().left;

    $.ajax({
        url: "/data.json",
        method: "GET",
        success: function (response) {
            var myHtml = "";
            for (var i = 0; i < response.length; i++) {
                var link =
                    "<a href=" +
                    response[i].url +
                    ">" +
                    response[i].title +
                    "</a>";
                myHtml = myHtml + link;
            }
            headlines.html(myHtml); // $("#headlines") wuerde auch gehen, haben ja erstellt (ajax request immer spaeter, egal wo im Code steht)
            moveHeadlines();
            //reset links
        },
    });

    //1. wo moveHeadlines? Inside ajax.req oder draußen ä ö ü 
    //2. ajaxcomplete den rest reinhauen, dass zu passendem Zeitpunkt gelöst?
    //eventdelegation

    function moveHeadlines() {
        left--;

        if (left == -links.first().outerWidth()) {
            left += links.eq(0).outerWidth();
            links.eq(0).appendTo(headlines);
            links = $("a"); //we have to set the links again to current thing
        }

        headlines.css({
            left: left + "px",
        });

        reqId = requestAnimationFrame(moveHeadlines);
    }

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
