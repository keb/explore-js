module.exports = () => {
    // A Map is a data structure that associates values (keys) with other values
    // It's possible to use JS Objects for this:
    let objAges = {
        Boris: 32,
        Liang: 22,
        Julia: 53
    };

    // The for...of statement creates a loop iterating over ITERABLE objects, including:
    // built-in String, Array, Array-like objects (arguments or NodeList), TypedArray, Map, Set, and user-defined variables
    // It invokes a custom iteration hook with statements to be executed for the value of each distinct prop of the object
    for (let i of Object.keys(objAges)) {
        console.log(i);
    }

    // The problem here is this:
    console.log('toString' in objAges); // true

    // You can solve this by creating an object with no prototype
    let foo = Object.create(null);
    foo.Boris = 32;
    console.log('Boris' in foo); // true
    console.log('toString' in foo); // false
    
    // Or you can use a Map
    // Map object holds key-value paris and remembers the original insertion of the keys
    /**
     * 1. The keys in Objects are Strings and Symbols. In Maps, they can be anything including functions
     * 2. The keys in Map are ordered
     * 3. You can get the size of a Map easily with `size` property
     * 4. Map is an iterable; with Object, you can to obtain keys before iterating
     * 5. An Object has a prototype
     * 6. A Map may perform better in scenarios involving frequent addition and removal of key pairs
     */

    let ages = new Map();
    ages.set('John', 32);
    ages.set('Bill', 43);
    ages.set('Kevin', 26);

    console.log(ages.size); // 3

    const addTwo = x => x + 2;
    ages.set(addTwo, 'addTwoFunc');

    console.log(ages.get(addTwo)); // addTwoFunc

    for (let [key, val] of ages) {
        console.log(key + ' = ' + val); // John = 32
    }

    for (let [key, val] of ages.entries()) {
        console.log(key + ' = ' + val); // John = 32
    }

    // Can also use forEach method
    ages.forEach((val, key) => {
        console.log(`forEach: ${key} = ${val}`)
    });

    // Relation to Array objects
    let kvArray = [['key1', 'val1'], ['key2', 'val2'], ['key3', 'val3']];
    let fancyMap = new Map(kvArray);

    console.log(fancyMap.get('key1')); // val1

    // Then you can do this
    console.log( Array.from(fancyMap) ); // [['key1', 'val1'], ['key2', 'val2'], ['key3', 'val3']]

    // Or use the keys or values iterators
    console.log( Array.from(fancyMap.keys()) ); // ['key1', 'key2', 'key3']

    // Just like Arrays, Maps can be cloned
    let clone = new Map(fancyMap);
    console.log(clone === fancyMap); // false

    clone.set('key1', 'changed val 1');
    // its a deep copy
    console.log( clone.get('key1') + ' does not equal ' + fancyMap.get('key1') ); // changed val 1 does not equal val1

    // Maps can be merged. The last repeated key wins
    // Spread operator converts a Map into an Array
    let merged = new Map([...fancyMap, ...clone]);

    console.log(merged.get('key1')); // changed val 1
    console.log(merged.get('key2')); // val2
    console.log(merged.get('key3')); // val3

    // You can merge them with arrays too!!
    let mergedAgain = new Map([...merged, [4, 'eins']]);
    console.log(mergedAgain);
};