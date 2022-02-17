(function () {
    var kitties = document.querySelectorAll("#kitties img");

    var current = 0; //bc we know index 0 is the kitty which we see first!

    var container = document.getElementById("kitties");

    container.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            setTimeout(moveKitties, 5000);
        }
    });

    function moveKitties() {
        //remove onscreen from the first and add exit to it
        kitties[current].classList.remove("onscreen");
        kitties[current].classList.add("exit");

        //ggf. function wenn transitionEND nutzen bier to remove the exit?
        //aber nur auf die kitty mit der exit klasse! Problem da hier zwei transitions sind
        //zwei möglichkeiten: über alle Kitties loopen und schauen wo transition event passierT!!

        //wenn current über länge ist geh wieder auf 0;
        current++;
        if (current == kitties.length) {
            current = 0;
        }

        //add onscreen class to kitty at the new current index
        kitties[current].classList.add("onscreen");

        //setTimeout(moveKitties, 2000); macht hier auch Sinn, oben besser da immer drauf geachtet wird
    }

    setTimeout(moveKitties, 5000);
})();
