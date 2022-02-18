(function () {
    var kitties = document.querySelectorAll("#kitties img");
    console.log(kitties);

    var current = 0; //bc we know index 0 is the kitty which we see first!

    var container = document.getElementById("kitties");

    //Um das exit wieder weg zunehmen von dem Linken nachdem aktion vorbei
    //geht auch mit for loop über die kitties
    container.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            setTimeout(moveKitties, 5000);
        }
    });

    // //OPTION 2 für Zeile 7 bis 16 + achte drauf unten setTimeout wieder rein zu nehmen!
    // //addEventListener geht nicht auf kitties!!!! da ne Liste und kein einzelnes Object
    // for (var i = 0; i < kitties.length; i++) {
    //     kitties[i].addEventListener("transitionend", function (e) {
    //         console.log(e); //sind ja zwei Events
    //         if (e.target.classList.contains("exit")) {
    //             e.target.classList.remove("exit");
    //         }
    //     });
    // }

    function moveKitties() {
        //remove onscreen from the first and add exit to it
        kitties[current].classList.remove("onscreen");
        kitties[current].classList.add("exit");

        //kitties[current].classList.remove("exit"); aber dann wartet es das transitioning nicht ab

        //wenn current über länge ist geh wieder auf 0;
        current++;
        if (current == kitties.length) {
            current = 0;
        }

        //add onscreen class to kitty at the new current index
        kitties[current].classList.add("onscreen");

        //setTimeout(moveKitties, 5000); // macht hier auch Sinn, oben besser da immer drauf geachtet wird
    }

    setTimeout(moveKitties, 5000);
})();
