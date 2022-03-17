module.export.increase = function increase(n) {
    if (isNaN(n) || n <= 0) {
        return "ERROR!";
    }
    while (n < 10000000) {
        n *= 10;
    }
    return n;
};
