(function () {
    var moreButton = $(".more-button");
    var next = "";

    moreButton.on("click", function () {
        //console.log(next);
        reqMore(next);
    });

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
                next = req(response); //returns for next get requ
            },
        });
    });

    /*___________________________FIRST RESPONSE_________________________*/
    function req(response) {
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

        var old = $(".results-container").html();
        $(".results-container").html(old + resultsHtml);
        moreButton.show();

        //need to check both true (bc if there is no next!!!) that doe does not break
        var nextUrl =
            response.next &&
            response.next.replace(
                "api.spotify.com/v1/search",
                "spicedify.herokuapp.com/spotify"
            ); //da wir nicht direkt auf Spotify können;
        return nextUrl;
    }

    /*___________________________MORE RESPONSE_________________________*/
    function reqMore(nextUrl) {
        $.ajax({
            method: "GET",
            url: nextUrl,
            //wir müssen neues data nicht definieren!!! ist bei next schon enthalten
            success: function (response) {
                next = req(response);
            },
        });
    }
})();
