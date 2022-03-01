/* Refactored Code - Version #1 OHNE AJAX Refactoring*/

(function () {
    var nextUrl;

    $("#go").on("click", function () {
        $.ajax({
            url: "https://spicedify.herokuapp.com/spotify",
            method: "GET",
            data: {
                query: $("input").val(),
                type: $("select").val(),
            },
            success: function (data) {
                data = data.albums || data.artists;

                // option #1 - you can store what the fn returns in a variable and pass that variable to the html method
                var html = generateResultsHtml(data.items);
                $("#results-container").html(html);

                setNextUrl(data.next);
            },
        });
    });

    $("#more").on("click", function () {
        $.ajax({
            url: nextUrl,
            method: "GET",
            success: function (data) {
                data = data.albums || data.artists;

                // option #2 - you can call the generateResultsHtml function directly inside append
                $("#results-container").append(generateResultsHtml(data.items));

                setNextUrl(data.next);
            },
        });
    });

    function setNextUrl(next) {
        nextUrl =
            next &&
            next.replace(
                "https://api.spotify.com/v1/search",
                "https://spicedify.herokuapp.com/spotify"
            );
    }

    function generateResultsHtml(items) {
        var html = "";
        for (var i = 0; i < items.length; i++) {
            var img = "/default.jpg";
            if (items[i].images[0]) {
                img = items[i].images[0].url;
            }

            html += "<div>" + items[i].name + "</div>";
        }

        return html;
    }
})();

/* Refactored Code - Version #2 MIT AJAX Refactoring*/
(function () {
    var nextUrl;

    $(document).on("click", "#go, #more", function (e) {
        var goWasClicked = e.target.id === "go"; 

        if (goWasClicked) {
            var url = "https://spicedify.herokuapp.com/spotify";
            var data = {
                query: $("input").val(),
                type: $("select").val(),
            };
        } else {
            // this means we clicked on the more button!
            url = nextUrl;
        }

        $.ajax({
            url: url,
            data: data,
            success: function (data) {
                data = data.albums || data.artists;

                setNextUrl(data.next);

                if (goWasClicked) {
                    $("#results-container").html(
                        generateResultsHtml(data.items)
                    );
                } else {
                    $("#results-container").append(
                        generateResultsHtml(data.items)
                    );
                }
            },
        });
    });

    function setNextUrl(next) {
        nextUrl =
            next &&
            next.replace(
                "https://api.spotify.com/v1/search",
                "https://spicedify.herokuapp.com/spotify"
            );
    }

    function generateResultsHtml(items) {
        var html = "";
        for (var i = 0; i < items.length; i++) {
            var img = "/default.jpg";
            if (items[i].images[0]) {
                img = items[i].images[0].url;
            }

            html += "<div>" + items[i].name + "</div>";
        }

        return html;
    }
})();
