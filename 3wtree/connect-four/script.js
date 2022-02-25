//JS adds the classes player1 or 2 to the slot when one clicks
//also note:

(function () {
    var currentPlayer = "player1";

    //Wer ist dran?
    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    $(".column").on("click", function (e) {
        //currentTaget bezieht sich immer auf column! nie auf das target das zb ein Loch sein kann
        //get all slots ..> go through them and add class to lowest empty
        var col = $(e.currentTarget);
        var solotsInCol = col.children();

        for (var i = 5; i >= 0; i--) {
            if (
                !solotsInCol.eq(i).hasClass("player1") &&
                !solotsInCol.eq(i).hasClass("player2")
            ) {
                solotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        //edge case: when someoneclicks on it and full nothing happens
        if (i < 0) {
            return;
        }

        //Check Vicotry
        if (checkForVictory(solotsInCol)) {
            //do victory dance
            console.log("Won");
        } else if (checkForVictory($(".row" + i))) {
            //do vicotry dance
            console.log("Won");
        } else {
            //check diagonally
        }

        //if no victory above, switch players
        switchPlayers();
    });

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    //VICTORY
                    return true;
                }
            } else {
                //meaning if other player there set again to 0
                count = 0;
            }
        }
    }
})();
