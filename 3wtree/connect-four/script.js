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

    //nur setzup der Animation
    spielerWechsel();

    $(".column").on("click", function (e) {
        //currentTaget bezieht sich immer auf column! nie auf das target das zb ein Loch sein kann
        //get all slots ..> go through them and add class to lowest empty
        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        //edge case: when someoneclicks on it and full nothing happens
        if (i < 0) {
            return;
        }

        //Check Vicotry
        if (checkForVictory(slotsInCol)) {
            //do victory dance
            showDeleteModal();
        } else if (checkForVictory($(".row" + i))) {
            //do vicotry dance
            showDeleteModal();
        } else if (checkForDiagonalVictory()) {
            //check diagonally
            showDeleteModal();
        }

        //if no victory above, switch players
        switchPlayers();
        spielerWechsel();
    });

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    //Person hat gewonnen
                    return true;
                }
            } else {
                //meaning if other player there set again to 0
                count = 0;
            }
        }
    }

    function checkForDiagonalVictory() {
        var allSlots = $(".slot");
        for (var i = 0; i < winningCombos.length; i++) {
            var count = 0;
            for (var j = 0; j < winningCombos[i].length; j++) {
                if (allSlots.eq(winningCombos[i][j]).hasClass(currentPlayer)) {
                    count++;
                }
            }
            //nachdem einmal durch mit 4 -> Testen oder nächstes!
            if (count == 4) {
                return true;
            } else {
                count = 0;
            }
        }
    }

    function showDeleteModal() {
        var modal = $(".modal");
        var close = $("#restart");
        var modalText = $("h1");

        var text = $(".spielerAnzeige");
        text.hide();

        if (currentPlayer == "player1") {
            modalText
                .html("THE WINNER IS: PLAYER 1")
                .css("color", "rgb(255, 115, 0)");
        } else {
            modalText
                .html("THE WINNER IS: PLAYER 2")
                .css("color", "rgb(0, 255, 213)");
        }

        modal.show();

        close.on("click", function (e) {
            e.stopPropagation();
            modal.hide();
            reStart();
            //nur Visuell
            spielerWechsel();
            text.show();
        });
    }

    function reStart() {
        $("#board").children().children().removeClass("player1");
        $("#board").children().children().removeClass("player2");
        currentPlayer = "player1";
    }

    function spielerWechsel() {
        var anzeige = document.getElementsByClassName("spielerAnzeige")[0];
        var text = $(".spielerAnzeige");

        document.addEventListener("mousemove", function (e) {
            console.log(e);
            anzeige.style.top = e.clientY + 10 + "px";
            anzeige.style.left = e.clientX + 10 + "px";
        });

        if (currentPlayer == "player1") {
            text.html("PLAYER 1 PLS SELECT").css({
                color: "rgb(255, 115, 0)",
                border: "solid 3px rgb(255, 115, 0)",
            });
        } else {
            text.html("PLAYER 2 PLS SELECT").css({
                color: "rgb(0, 255, 213)",
                border: "solid 3px rgb(0, 255, 213)",
            });
        }
    }

    var winningCombos = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38],
    ];
})();

//other difficult solutions require smth like this:
//$(".column").eq(0).children.eq(1); //erste Spalte eines nach rechts

//Gedanken von mir:
//console.log($("#board").children());
// for (var i = 0; i < 7; i++) {
//     console.log($("#board").children()[i] === e.currentTarget);
// }

//Andere Transitions:
//oder einfach das Ding Rotieren lassen
