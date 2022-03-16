const dbl = require("./dbl");

Promise.all([dbl(20), dbl(40), dbl(80)]).then(function ([dbl20, dbl40, dbl50]) {
    console.log("all done", dbl20, dbl40, dbl50);
});

// // console.log(
// //     dbl(100)
// // );

dbl(100).then(function(val) {
    console.log(val);
    console.log('something');
    return dbl(val).then(function(val) {
        console.log('prom2 is resolved with', val);
        return dbl(val + 'pizza');
    });
}).then(function(val) {
    console.log('prom2 is resolved with', val);
    return dbl(val + 'pizza');
}).then(function(val) {
    console.log('prom3 is resolved with', val);
}).catch(function(err) {
    console.log(err.message, 'ERROR!!!');

}).then(function() {
    console.log('fix0red');
});

// let prom = dbl(100);

// let prom2 = prom.then(function(val) {
//     console.log(val);
//     console.log('something');
//     return 'funky chicken';
// });

// prom2.then(function(val) {
//     console.log('prom2 is resolved with', val);
// })

//console.log(prom2);

// prom.then(function(val) {
//     console.log(val);
// });
