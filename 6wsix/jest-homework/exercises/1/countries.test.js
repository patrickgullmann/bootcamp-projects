// const countries = require("./countries");
// countries.find("..");
//SAME SAME aber kürzer
const { find } = require("./countries");

test("Passing an empty string, find returns an empty array", () => {
    const result = find("");
    expect(result).toEqual([]); //Array auch mit to Equal
});

test("The array that it returns contains no more than four matches", () => {
    const result = find("S"); //oder hier schon .length
    expect(result.length).toBe(4);
});

test("The search is case insensitive", () => {
    const result = find("Germany");
    const result2 = find("gERManY");
    expect(result[0]).toMatch("Germany"); //oder toBe?
    expect(result2[0]).toMatch("Germany");
});

test("If there are no matching countries, an empty array is returned", () => {
    const result = find("Sasdosdoppp");
    expect(result).toEqual([]);
});
