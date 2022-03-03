const readline = require("readline");

//console.log(readline);

const rl = readline.createInterface({
    input: process.stdin, //standard in, how programs get input (e.g. ls in the console), nextline: standard out
    output: process.stdout,
});

//console.log(rl);

// function fn() {
//     rl.question("Do you enjoy learning Node.js?", function (answer) {
//         //console.log(answer); //shows what I typed
//         if (answer === "yes") {
//             console.log("great!");
//             rl.close();
//         } else {
//             console.log("WRONG ANSWER");
//             fn();
//         }
//     });
// }
// fn();

//const story = require("./story1"); //gibt ja nur ein gesamtobject wieder also die file
//const story = require("./story1").story; //wir wollen ja das object das unter dem property story gespeichert ist

const { story } = require("./story1"); //ES6 way easier

function ask(storyItem) {
    console.log(storyItem);
    rl.question(storyItem.q, function (answer) {
        console.log(`you typed ${answer}`);
        console.log(storyItem.answers[answer]);
        if (storyItem.answers[answer]) {
            console.log("valid answer");
            if (typeof storyItem.answers[answer] == "object") {
                //game continues bc object
                //call function again and store new story item "storyItem.answers[answer]" this is it
            } else {
                //if we 
                console.log(storyItem.answers[answer]);
                rl.close();
            }
        } else {
            console.log("invalid");
            //Maybe log a message asking the user not to be wrong
            //ask the same question again meaning call again and passing same story item?
        }
    });
}

ask(story); //sidenote: JSON.stringyfy(story) würde noch tiefere ebenen geben als die oberste

//to continue game check if next is an obj 