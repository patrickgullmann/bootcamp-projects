(function () {
    var moreButton = $(".more-button");

    $(".submit-button").on("click", function () {
        var userInput = $("input").val();
        var artistOrAlbum = $("select").val();

        $.ajax({
            method: "GET",
            url: "https://spicedify.herokuapp.com/spotify",
            data: {
                query: userInput, //spotify demands this
                type: artistOrAlbum, //spotify demands that is called like this e.g. artist or album
            },
            success: function (response) {
                //note spotify gives me by default first 20 search result, and a next propertiy

                response = response.artists || response.albums; //could write this as as if response.artists == true make response = response.artist else make response.album bc we could get back both

                var resultsHtml = "";
                for (var i = 0; i < response.items.length; i++) {
                    var defaultImage =
                        "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/o-BROKEN-HEART-facebook676-660x330.jpg";

                    if (response.items[i].images.length > 0) {
                        defaultImage = response.items[i].images[0].url;
                    }

                    resultsHtml +=
                        //here wrapping of img in a Tag
                        "<a href='" +
                        response.items[i].external_urls.spotify +
                        "'>" +
                        "<img src='" +
                        defaultImage +
                        "' alt='image' >" +
                        "</a>" +
                        //here now Text in a Tag
                        "<a href='" +
                        response.items[i].external_urls.spotify +
                        "'>" +
                        response.items[i].name +
                        "</a>";
                }

                $(".results-container").html(resultsHtml);
                moreButton.show();

                //need to check both true (bc if there is no next!!!) that doe does not break
                var nextUrl =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "spicedify.herokuapp.com/spotify"
                    ); //da wir nicht direkt auf Spotify können;
            },
        });
    });
})();
