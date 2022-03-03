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

let getNameAndCountryOld = ({ name, country }) => [name, country];

let getNameAndCountry = function (obj) {
    return [obj.name, obj.country];
};

// Also possible:
// let getNameAndCountry = function ({ name, country }) {
//     return [name, country];
// };

let getRelocatedCityOld = (city1, city2 = { country: "Germany" }) => {
    let [, country] = getNameAndCountryOld(city2);
    return {
        ...city1,
        country, //is short for country: country als replacing
    };
};

let getRelocatedCity = function (cityOne, cityTwo) {
    if (typeof cityTwo == "undefined") {
        cityTwo.country = "Germany";
    }
    var arr = getNameAndCountry(cityTwo);
    var newCountry = arr[1];

    var newObj = {};
    newObj.name = cityOne.name;
    newObj.country = newCountry;

    // would not be a new Object
    // var newObj = cityOne;
    // newObj.country = newCountry;

    return newObj;
};

//Testen
console.log(
    getNameAndCountryOld({
        name: "Berlin",
        country: "Germany",
    })
);

console.log(
    getNameAndCountry({
        name: "Berlin",
        country: "Germany",
    })
);

console.log(
    getRelocatedCityOld(
        {
            name: "Berlin",
            country: "Germany",
        },
        {
            name: "Paris",
            country: "France",
        }
    )
);

console.log(
    getRelocatedCity(
        {
            name: "Berlin",
            country: "Germany",
        },
        {
            name: "Paris",
            country: "Belgium",
        }
    )
);
