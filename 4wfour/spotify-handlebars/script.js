(function () {
    /* <------DO NOT TOUCH (brauchen wir da wir keinen Server haben)-----> */
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function (script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    /* <-----------------------DO NOT TOUCH ---------------------> */

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
                    var notification = {
                        message: "No results found",
                    };
                    $(".results-notification").html(
                        Handlebars.templates.templateNotificationNo(
                            notification
                        )
                    );
                } else {
                    notification = {
                        message: userInput,
                    };
                    $(".results-notification").html(
                        Handlebars.templates.templateNotificationYes(
                            notification
                        )
                    );
                }

                var allResults = [];
                for (var i = 0; i < response.items.length; i++) {
                    var defaultImage =
                        "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/o-BROKEN-HEART-facebook676-660x330.jpg";

                    if (response.items[i].images.length > 0) {
                        defaultImage = response.items[i].images[0].url;
                    }

                    // var resultsHtml = ""; etc not needed
                    var result = {
                        link: response.items[i].external_urls.spotify,
                        image: defaultImage,
                        name: response.items[i].name,
                    };
                    allResults.push(result);
                }

                // $(".results-container").html(resultsHtml); //not needed
                //note: it would also work if we leave it as an array! but it expects an objecT -> loop over property
                $(".results-container").html(
                    Handlebars.templates.templateContainer({
                        objResults: allResults,
                    })
                );

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

                        var allResults = [];
                        for (var i = 0; i < response.items.length; i++) {
                            var defaultImage =
                                "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/o-BROKEN-HEART-facebook676-660x330.jpg";

                            if (response.items[i].images.length > 0) {
                                defaultImage = response.items[i].images[0].url;
                            }

                            var result = {
                                link: response.items[i].external_urls.spotify,
                                image: defaultImage,
                                name: response.items[i].name,
                            };
                            allResults.push(result);
                        }

                        // $(".results-container").append(resultsHtml); //not needed
                        /* YOU CAN ALSO CHANGE THE HTML TO APPEND */
                        $(".results-container").append(
                            Handlebars.templates.templateContainer({
                                objResults: allResults,
                            })
                        );

                        /* ab hier alt */

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

                var allResults = [];
                for (var i = 0; i < response.items.length; i++) {
                    var defaultImage =
                        "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/o-BROKEN-HEART-facebook676-660x330.jpg";

                    if (response.items[i].images.length > 0) {
                        defaultImage = response.items[i].images[0].url;
                    }

                    var result = {
                        link: response.items[i].external_urls.spotify,
                        image: defaultImage,
                        name: response.items[i].name,
                    };
                    allResults.push(result);
                }

                // $(".results-container").append(resultsHtml); //not needed
                /* YOU CAN ALSO CHANGE THE HTML TO APPEND */
                $(".results-container").append(
                    Handlebars.templates.templateContainer({
                        objResults: allResults,
                    })
                );

                /* ab hier alt */
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

//<----------------WORKAROUND BC I DINDT KNOW APPEND WORKS --------->
// var oldContent = $(".results-container").html();
// $(".results-container").html(
//     Handlebars.templates.templateContainer({
//         objResults: allResults,
//     })
// );
// var newContent = $(".results-container").html();
// $(".results-container").html(oldContent + newContent);
