//Aufgabe 1
function reverseOrder(arr) {
    let newArr = [...arr];
    return newArr.reverse();
    //auch möglich: [...arr].reverse();
}

let testArr = ["grün", "rot", "gelb", "schwarz"];
console.log(reverseOrder(testArr));

//Aufgabe 2
function combineArrays(arr, arr2) {
    let newArr = [...arr, ...arr2];
    return newArr;
    //auch möglich: return [...arr, ...arr2]
}

let testArr1 = [0, 1, 2, 4];
console.log(combineArrays(testArr, testArr1));

//Aufgabe 3
function logInfo(city) {
    // const name = city.name;
    // const country = city.country;
    // const numPeople = city.population;

    //rename der Population wichtig!
    let { name, country, population: numPeople } = city;

    console.log(
        `${name} is in ${country} and has ${numPeople} inhabitants in it.`
    );
}
logInfo({ name: "Marseille", country: "France", population: 861635 });

//Aufgabe 4
