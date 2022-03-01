(function () {
    var moreButton = $(".more-button");
    //WICHTIG: wir müssen einfach nach jedem click die next adresse hier speichern und im button more neu abrufen
    var next = "";

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
                next = nextUrl; //returns for next get request
            },
        });
    });

    moreButton.on("click", function () {
        //wenn hier geklickt wurde, dann haben wir ein next durch ajax erhalten
        $.ajax({
            method: "GET",
            url: next,
            //wir müssen neues data nicht definieren!!! ist bei next schon enthalten
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

                $(".results-container").append(resultsHtml);
                moreButton.show();

                var nextUrl =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "spicedify.herokuapp.com/spotify"
                    );
                next = nextUrl;
                //setUrl(response.next); //könnten auch als Funktion machen, und oben natürlich auch
            },
        });
    });

    // function setUrl(next) {
    //     var nextUrl =
    //         next &&
    //         next.replace(
    //             "api.spotify.com/v1/search",
    //             "spicedify.herokuapp.com/spotify"
    //         ); //da wir nicht direkt auf Spotify können;
    //     next = nextUrl; //change for next get request
    // }
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