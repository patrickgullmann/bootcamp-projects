const os = require("os");

//Processor consists of multiple cores/cpus
//when we run a process it will run on one core -> meaning just eg 16 processes same time
//but our system switches fast between processes so we will be able to run more at same time
console.log(os.cpus().length);


//why do this? (normally it would run on one cpu)
// -> if other cores free and available at that time i can use them also 
// -> having more processing power

// <---------------------------- SCHAU IN DIE PORFOLIO DATEI MASTER ----------------->