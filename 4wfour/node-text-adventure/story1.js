const story = {
    q: "Welcome to Pokemon! But the nice red edition! Not the shitty crap nowadays! Would you like to be Ash Ketschup? ",
    answers: {
        yes: {
            q: "You are alone in a dark forest and facing a Picachu. What do you do? ",
            answers: {
                fight: {
                    q: "The Picachu hates fighting! So he asks you a question to get caught: What is Picachus color? ",
                    answers: {
                        yellow: "Congratulations Picachu caught!",
                    },
                },
                run: "This was not the right choice. Loooooooser!",
            },
        },
        no: "Alright then. Who does not want that? Weirdooo!",
    },
};

exports.story = story;
