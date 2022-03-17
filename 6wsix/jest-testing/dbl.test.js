// dbl.test.js
const { dbl } = require("./dbl.js");

test("dbl return a number value * 2", () => {
    return dbl(6).then((result) => {
        // expect(result).toBe(12);
        expect(result).toBe(2 * 6);
    });
});

test("dbl rejects promise if NaN is passed", () => {
    return dbl("cupcake").catch((err) => {
        expect(err).toBe("bad number cannot double");
    });
});
