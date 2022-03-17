// increase.test.js
//#1 step: require the module you want to test

const { increase } = require("./increase");

// #2 writing tests for the different test cases
// jest provides a test method
// test takes two arguments:
// 1st a string that describes my test case
// 2nd a callback function that runs my actual test
// testing NaN
test("Passing NaN to increase produces the string ERROR!", () => {
    const result = increase(NaN); // we call our function as we would

    expect(result).toBe("ERROR!"); // we write and expect statement, that contains what we expect the outcome to be
});

// testing 0 or less than 0
test("passing 0 to increase evaluates to string ERROR!", () => {
    const result = increase(0);
    expect(result).toBe("ERROR!");
});

// testing 0 or less than 0
test("passing a negative number to increase evaluates to string ERROR!", () => {
    expect(increase(-9)).toBe("ERROR!");
});

// testing number higher than 0 less than a million
test("passing 2 to increase will evalute to 2000000", () => {
    expect(increase(2)).toBeGreaterThan(1000000);
});

// testing number higher than a million
test("passing 1000001 will evaluete to that number", () => {
    expect(increase(1000001)).toBe(1000001);
});
