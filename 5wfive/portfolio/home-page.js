const fs = require("fs");

function generateHomePage() {
    // 1) Pick up the content of your projects directory with fs.readdirSync() (start with the sync version!)
    // 2) Loop over the array of project directories and construct a list
    // of html tags representing them

    const files = fs.readdirSync(`${__dirname}/projects`, {
        withFileTypes: true,
    });

    let listOfProjects = "";

    files.forEach((item) => {
        if (item.isDirectory()) {
            listOfProjects += `<li><a href="http://localhost:8080/${item.name}">${item.name}</a></li>`;
        }
    });

    return `
     <h1 style="color: magenta">My list of awesome projects contains</h1>
     <ul>
       ${listOfProjects}
     </ul>
     <h1 style="color: magenta">Badummmmmz</h1>
   `;
}

module.exports.generateHomePage = generateHomePage;
