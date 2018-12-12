module.exports = () => {
    // When you define a function with `function*` it becomes a generator
    // When you call a generator, it returns an iterator, which we saw in Chapter 6 https://eloquentjavascript.net/06_object.html

    // An infinite iterator
    function* powers(n) {
        for (let current = n; ; current *= n) {
            yield current;
        }
    }

    for (let power of powers(3)) {
        if (power > 50) break; // this loop will go on forever if not for this line
        console.log(power);
    }

    // Another infinite iterator
    function* idMaker() {
        var index = 0;
        while (true) {
            yield index++;
        }
    }

    var gen = idMaker(); // Generator { }
    console.log(gen.next().value); // 0
    console.log(gen.next().value) // 1
};