//Hausaufgabe 1
// var a = document.getElementsByTagName("A");
// for (var i = 0; i < a.length; i++) {
//     a[i].style.color = "yellow";
// }
// BUT it should be querySelectorAll is bc works with all tags names etc

function change(str) {
    var ls = document.querySelectorAll(str);
    for (var i = 0; i < ls.length; i++) {
        ls[i].style.fontWeight = "bold";
        ls[i].style.fontStyle = "italic";
        ls[i].style.textDecoration = "underline";
    }
}
change("p");

//Hausaufabe 2
// //get elementsbyclassName does not return an array!
// so inside the function we need to transform it in the function?

function getArr(cName) {
    var ls = document.getElementsByClassName(cName);
    var arr = [];
    for (var i = 0; i < ls.length; i++) {
        arr[i] = ls[i];
    }
    return arr;
}

getArr("gh-sch-prom");

//Hausaufgabe 3

function insert() {
    let p = document.createElement("p");
    p.style.position = "fixed";
    p.style.zIndex = "2147483647";
    p.style.left = "20px";
    p.style.top = "100px";
    p.style.fontSize = "200px";
    p.innerHTML = "AWESOME";
    //p.style.backgroundColor = "blue";
    //p.style.height = "100px";
    document.body.appendChild(p);
}

insert();
