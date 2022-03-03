const readline = require("readline");
const chalk = require("chalk"); //for color

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const { story } = require("./story1"); //ES6 way easier

let color = "white"; //startcolor

function ask(storyItem) {
    let keysArr = [];
    for (var key in storyItem.answers) {
        keysArr.push(key);
    }

    if (keysArr.length >= 2) {
        var question = keysArr.join("|");
    } else {
        question = "|No hints this time|";
    }

    //chalk.color geht nicht da variable und das wird zu string chalk.blue würde gehen
    rl.question(chalk[color](storyItem.q + question + " "), function (answer) {
        if (storyItem.answers[answer]) {
            if (typeof storyItem.answers[answer] == "object") {
                ask(storyItem.answers[answer]);
            } else {
                console.log(chalk[color](storyItem.answers[answer]));
                rl.close();
            }
        } else {
            console.log(
                chalk[color]("Your answer was no valid input! Try again!")
            );
            ask(storyItem); //ask again
        }
    });
}

function askColor() {
    rl.question("Which color should your questions have? ", function (answer) {
        if (validColors.includes(answer)) {
            color = answer;
            ask(story); //start game
        } else {
            console.log("Thats not a color ... ");
            askColor();
        }
    });
}

askColor();

const validColors = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "blackBright",
    "gray",
    "grey",
    "redBright",
    "greenBright",
    "yellowBright",
    "blueBright",
    "magentaBright",
    "cyanBright",
    "whiteBright",
];

/* <---------------------EXPLANATIONS ------------------------> */
function askWithComments(storyItem) {
    //story item has two properties q and answers. Answers also has two properties which could be a object or a string
    rl.question(storyItem.q, function (answer) {
        //"answer" is what the person typed + if the typed stuff machtes a property key of answers we start, else we do again
        if (storyItem.answers[answer] /* === true */) {
            //if the property of it contains an object
            if (typeof storyItem.answers[answer] == "object") {
                //go one step further
                ask(storyItem.answers[answer]);
            } else {
                //if the property is not object(it is string), just print it out
                console.log(storyItem.answers[answer]);
                rl.close();
            }
        } else {
            console.log("Your Answer was no valid input -> Pls try again!");
            ask(storyItem); //ask again
        }
    });
}
