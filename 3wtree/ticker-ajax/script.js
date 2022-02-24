(function () {
    var headlines = $("#headlines");
    var links; //unten Zuweisen! Nachdem geladen!!
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

            links = $("a");
            moveHeadlines();
            addStopMovingEventListener(); //als Funktion rufen
        },
    });

    //1. wo moveHeadlines? -> drinnen besser
    //2. ajaxcomplete den rest reinhauen nicht gut -> Über funktionen lösen

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

    //mache über Funktionen verfügbar, die ganzen Eventlistener
    function addStopMovingEventListener() {
        links.on("mouseenter", function (e) {
            cancelAnimationFrame(reqId);
            $(e.target).css({
                color: "blue",
            });
        });

        links.on("mouseleave", function (e) {
            moveHeadlines();
            $(e.target).css({
                color: "-webkit-link",
            });
        });
    }
})();
