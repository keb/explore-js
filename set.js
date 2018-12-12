module.exports = () => {
    // Set is a collection of values, where each value may occur only once
    let set = new Set();

    let john = { name: 'John' };
    let pete = { name: 'Pete' };
    let mary = { name: 'Mary' };

    set.add(john);
    set.add(john);
    set.add(john);
    set.add(mary);
    set.add(pete);
    set.add(mary);

    console.log(set.size); // 3

    // the alternative would be an array of users, and the code to check for duplicates on every insertion using arr.find, but th performance would be much worse
    // Set is more optimized internally

    // Looping
    for (let user of set) {
        console.log(user);
    }

    // or
    set.forEach((user, userAgain, set) => {
        console.log(user);
    });

    console.log( set.keys() ); // returns iterable object for values
    console.log( set.values() ); // same as set.keys, for compatibility with Map
    console.log( set.entries() ); // returns iterable object for entries [value, value], exists for compat with Map
};