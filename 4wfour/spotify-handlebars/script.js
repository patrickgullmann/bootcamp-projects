(function () {
    var moreButton = $(".more-button");
    var next = "";

    $(".submit-button").on("click", function () {
        var userInput = $("input").val();
        var artistOrAlbum = $("select").val();

        $.ajax({
            method: "GET",
            url: "https://spicedify.herokuapp.com/spotify",
            data: {
                query: userInput,
                type: artistOrAlbum,
            },
            success: function (response) {
                response = response.artists || response.albums;

                if (response.items.length == 0) {
                    moreButton.hide();
                    $(".results-notification").html("<p>No results found<p>");
                } else {
                    $(".results-notification").html(
                        "<p>Results for: " + userInput + "<p>"
                    );
                }

                var resultsHtml = "";
                for (var i = 0; i < response.items.length; i++) {
                    var defaultImage =
                        "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/o-BROKEN-HEART-facebook676-660x330.jpg";

                    if (response.items[i].images.length > 0) {
                        defaultImage = response.items[i].images[0].url;
                    }

                    resultsHtml +=
                        "<a href='" +
                        response.items[i].external_urls.spotify +
                        "'>" +
                        "<img src='" +
                        defaultImage +
                        "' alt='image' >" +
                        "</a>" +
                        "<a href='" +
                        response.items[i].external_urls.spotify +
                        "'>" +
                        response.items[i].name +
                        "</a>";
                }

                $(".results-container").html(resultsHtml);

                /* <----------------------NEUER TEIL für infinite scroll ------------------------>*/
                // location.search is ?scroll=infinite und wenn größer -1> bedeutet es hat nen Index im String
                if (location.search.indexOf("?scroll=infinite") > -1) {
                    // wenn drin stehen haben, call new function to check the user is near the bottom of the page
                    checkScrollPos();
                } else {
                    // anonsten -> wenn nicht in URL stehen haben dann normal weitere mit Button Laden
                    if (response.items.length != 0) {
                        moreButton.show();
                    }
                }
                /* <----------------------Ende Neuer Teil ------------------------------------>*/

                var nextUrl =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "spicedify.herokuapp.com/spotify"
                    );
                next = nextUrl;
            },
        });
    });

    function checkScrollPos() {
        setTimeout(function () {
            if (
                // zb ganz unten: wie weit von oben (im Dokument) + höhe window == höhe document
                $(document).scrollTop() + $(window).height() >
                $(document).height() - 300
            ) {
                // wenn User 300px oder näher am Boden -> Ajax request um neue zu laden! -> nicht mehr butten, aber selber code wie in button
                $.ajax({
                    method: "GET",
                    url: next,
                    success: function (response) {
                        response = response.artists || response.albums;

                        var resultsHtml = "";
                        for (var i = 0; i < response.items.length; i++) {
                            var defaultImage =
                                "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/o-BROKEN-HEART-facebook676-660x330.jpg";

                            if (response.items[i].images.length > 0) {
                                defaultImage = response.items[i].images[0].url;
                            }

                            resultsHtml +=
                                "<a href='" +
                                response.items[i].external_urls.spotify +
                                "'>" +
                                "<img src='" +
                                defaultImage +
                                "' alt='image' >" +
                                "</a>" +
                                "<a href='" +
                                response.items[i].external_urls.spotify +
                                "'>" +
                                response.items[i].name +
                                "</a>";
                        }

                        $(".results-container").append(resultsHtml);

                        var nextUrl =
                            response.next &&
                            response.next.replace(
                                "api.spotify.com/v1/search",
                                "spicedify.herokuapp.com/spotify"
                            );
                        next = nextUrl;
                        // also call it again after we did the request!!! -> muss ja immer laufen
                        checkScrollPos();
                    },
                });
            } else {
                // call this funciton again to check the scroll position
                checkScrollPos();
            }
        }, 500);
    }

    moreButton.on("click", function () {
        $.ajax({
            method: "GET",
            url: next,
            success: function (response) {
                response = response.artists || response.albums;

                var resultsHtml = "";
                for (var i = 0; i < response.items.length; i++) {
                    var defaultImage =
                        "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/o-BROKEN-HEART-facebook676-660x330.jpg";

                    if (response.items[i].images.length > 0) {
                        defaultImage = response.items[i].images[0].url;
                    }

                    resultsHtml +=
                        "<a href='" +
                        response.items[i].external_urls.spotify +
                        "'>" +
                        "<img src='" +
                        defaultImage +
                        "' alt='image' >" +
                        "</a>" +
                        "<a href='" +
                        response.items[i].external_urls.spotify +
                        "'>" +
                        response.items[i].name +
                        "</a>";
                }

                $(".results-container").append(resultsHtml);
                moreButton.show();

                var nextUrl =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "spicedify.herokuapp.com/spotify"
                    );
                next = nextUrl;
            },
        });
    });
})();

//add to the url ?scroll=infinite
//location.search gives the string

//incode check for querey string if so, hide more button and activite infite

//location.search.indexOf("scroll=infite") if eequals 1 than it fits or > -1 just means it is somewhere

// window.addEvenetListener("scroll", function(){}) firest when scrolling BUT DONT DO IT -> Fires to much

//if user reached the bottum with the mouse

// $(document).scrollTop() //how far we are aways from the top

// $(window).height() //gives one higth of the window but does not change

// $(document).height() // gives hight of whole document

// if hight of window + how much scrolled from the top is equal equal to the entire page
//than we are at bottom

// eg from hight of window substract e.g. 300px that it is not already at the bottom
