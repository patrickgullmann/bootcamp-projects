(function () {
    var inp = $("input");
    var resultsContainer = $("#results");
    var timer;

    inp.on("input focus", function () {
        var val = inp.val(); //userInput == input field

        if (!val) {
            resultsContainer.empty(); //Leer machen
            return;
        }

        clearTimeout(timer);
        timer = setTimeout(getter, 2000); //getter muss nicht definiert werden kann auch oben als function() {...} drin stehen

        function getter() {
            $.ajax({
                url: "https://spicedworld.herokuapp.com/",
                data: {
                    q: val,
                },
                success: function (response) {
                    //wenn aktueller Input noch UserInput von damals
                    if (inp.val() === val) {
                        //clearTimeout(timer - 1); //oben besser
                        matchesToPage(response);
                    } else {
                        return; //console.log("Too fast");
                    }
                },
            });
        }

        //Anmerkung: Zeilen 7 bis 12 auch in Funktion ziehen und funktion aus event handler auch möglich
    });

    //Außerhalb besser
    function matchesToPage(input) {
        var matches = input;
        if (matches.length) {
            var resultsHtml = "";
            for (var i = 0; i < matches.length; i++) {
                resultsHtml += "<div class='result'>" + matches[i] + "</div>";
            }
            resultsContainer.html(resultsHtml); //changes the innerHTML insides the div of the div with the id results -> it is not outerHTML where the id is stored!!
        } else {
            resultsContainer.html("<div id='noRes'>No results</div>");
        }
    }

    //Funktioniert nur wegen dem 2 Parameter
    $(document)
        .on("mouseover", "#results div", function (e) {
            $(".result").removeClass("highlight"); //oder "#results div"
            if ($(e.target).hasClass("result")) {
                $(e.target).addClass("highlight");
            }
        })
        .on("mousedown", "#results div", function (e) {
            var txt = $(e.target).html();
            inp.val(txt);
            resultsContainer.empty();
        });

    window.addEventListener("keydown", function (e) {
        var results = $("#results div");
        var highlighted = $(".highlight");

        if (e.key == "ArrowDown" && highlighted.length == 0) {
            results.first().addClass("highlight");
        } else if (
            e.key == "ArrowDown" &&
            highlighted.index() == results.length - 1
        ) {
            return; //do nothing
        } else if (e.key == "ArrowDown" && highlighted.length == 1) {
            var position = highlighted.index(); //index im Parent Container
            highlighted.removeClass("highlight"); // $(".result") auch möglich
            results.eq(position + 1).addClass("highlight");
        }

        if (e.key == "ArrowUp" && highlighted.length == 0) {
            results.last().addClass("highlight");
        } else if (e.key == "ArrowUp" && highlighted.index() == 0) {
            return; //do nothing
        } else if (e.key == "ArrowUp" && highlighted.length == 1) {
            position = highlighted.index(); //index im Parent Container
            highlighted.removeClass("highlight"); // $(".result") auch möglich
            results.eq(position - 1).addClass("highlight");
        }

        if (e.key == "Enter") {
            var txt = highlighted.html();
            inp.val(txt);
            resultsContainer.empty();
        }
    });

    //Erscheinen lassen mit focus oben
    inp.on("blur", function () {
        resultsContainer.empty();
    });
})();
