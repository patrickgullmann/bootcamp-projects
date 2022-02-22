(function () {
    var inp = $("input");
    var resultsContainer = $("#results");

    inp.on("input focus", function () {
        var val = inp.val(); //inp.on("input focus", wegen wieder rein klicken

        if (!val) {
            resultsContainer.empty(); //Leer machen
            return;
        }

        var matches = [];
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].toLowerCase().startsWith(val.toLowerCase())) {
                matches.push(countries[i]);
                if (matches.length == 4) {
                    break;
                }
            }
        }

        if (matches.length) {
            var resultsHtml = "";
            for (i = 0; i < matches.length; i++) {
                resultsHtml += "<div class='result'>" + matches[i] + "</div>";
            }
            resultsContainer.html(resultsHtml); //changes the innerHTML insides the div of the div with the id results -> it is not outerHTML where the id is stored!!
        } else {
            resultsContainer.html("<div id='noRes'>No results</div>");
        }
    });

    //special Jquery -> bc we cannot directly go on "#results div" bc they are not there when the page loads!!!
    //jequery helps -> the second argument says if the target of the event is that than do
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

    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Côte D'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Democratic People's Republic of Korea",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People’s Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Republic of Korea",
        "Republic of Moldova",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Tajikistan",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United Republic of Tanzania",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Viet Nam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];
})();
