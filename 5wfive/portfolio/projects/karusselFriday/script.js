(function () {
    var kitties = document.querySelectorAll("#kitties img");
    var current = 0;
    var container = document.getElementById("kitties");
    var dots = document.querySelectorAll(".dot");
    var transitioning = false;
    var timer;

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function (e) {
            if (transitioning) {
                return;
            }
            clearTimeout(timer); //Cancel the thing the browser wanted to do the next move
            for (var j = 0; j < dots.length; j++) {
                if (dots[j] === e.target) {
                    moveKitties(j); //change when clicked -> Passe Formel unten an
                    break;
                }
            }
        });
    }

    function moveKitties(dotIndex) {
        kitties[current].classList.remove("onscreen");
        transitioning = true; //as soon as cat move a click would not work bc of return
        dots[current].classList.remove("on");
        kitties[current].classList.add("exit");

        current++;

        //don't bring the next one, bring the one I clicked
        // agruments[0] test passt für ob da ein paramenter ist -> aber SPEZIALFALL: bei 0 nie rein, da 0 natürlich obwohl parameter als false ausgewertet wird
        if (arguments[0] || arguments[0] === 0) {
            // typeof arguments[0] === "number" // auch möglich
            dots[dotIndex].classList.add("on");
            kitties[dotIndex].classList.add("onscreen");
            current = dotIndex;
        } else {
            if (current == kitties.length) {
                current = 0;
            }
            dots[current].classList.add("on");
            kitties[current].classList.add("onscreen");
        }
    }

    timer = setTimeout(moveKitties, 3000);

    container.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("exit")) {
            transitioning = false; //after transition back
            e.target.classList.remove("exit");
            timer = setTimeout(moveKitties, 3000);
        }
    });

    //
    // for (var i = 0; i < dots.length; i++) {
    //     dots[i].addEventListener("click", function () {
    //         //console.log(i); //würde so immer 4 loggen, da zwar listener richtig
    //     }); // verteilt sind aber da callback function ja später gecallt wird (beim Click)
    // }     //ist der loop ja durchgelaufen und i als finales 4 gespeichert!! -> SCOPE Problem: vom großen scope in kleinen scope müssen dh wir müssen ein "i" reinkopieren dass das später dem gewollten index entspricht

    // for (var i = 0; i < dots.length; i++) {
    //     dots[i].addEventListener("click", dotClickHandler(i));
    // }

    // function dotClickHandler(indexValue) {
    //     return function () {
    //         console.log(indexValue);
    //     };
    // }

    // for (var i = 0; i < dots.length; i++) {
    //     (function (x) {
    //         dots[x].addEventListener("click", function () {
    //             console.log(x);
    //         });
    //     })(i);
    // }

    // for (var i = 0; i < dots.length; i++) {
    //     dots[i].addEventListener("click", function (e) {
    //         for (var j = 0; j < dots.length; j++) {
    //             if (dots[j] === e.target) {
    //                 console.log("indexValue: ", j);//wie oben das i immer noch gleich,
    //                 break; // aber später bei event gehen wir einfach durch welcher dot das target war und geben index!!
    //             }
    //         }
    //     });
    // }
})();
