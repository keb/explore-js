module.exports = () => {
    'use strict';

    let user = {
        name: 'john',
        age: 30
    };

    const sayHi = function() {
        console.log('Hi, from: ', this.name);
    };

    // sayHi();
    // In strict mode, doing this will throw an error, because `this` would be undefined
    // In non-strict mode, `this` will refer to the global object

    // `this` in methods
    user.sayHi = sayHi;
    user.sayHi(); // Hi, from: john

    // The value of this is evaluated during the run-time. It can be anything.
    let doug = { name: 'doug' };
    doug.sayHi = sayHi;
    doug.sayHi();

    // Reference Types
    let sam = {
        name: 'Sam',
        hi() {
            console.log(this.name);
        }
    };

    // Or do this
    let unbound = sam.hi;
    let bound = unbound.bind(sam);
    bound(); // 'Samn'

    sam.hi(); // 'Sam'
    (sam.hi)(); // 'Sam'
    // (sam.name === 'Sam' ? sam.hi : null)(); // Error!

    // /**
    //  * let hi = sam.hi;
    //  * hi(); // This will also Error!
    //  */

    // But if you do this:
    let hi = sam.hi;
    hi.call(sam); // Sam
    hi.apply(sam); // Sam

    // Call & Apply are mostly the same, but Call takes an argument list, Apply takes an Array

    // For sam.hi() to work, JavaScript does a trick --
    // the dot '.' returns not a function, but a value of the special `Reference Type`
    // When the parentheses are called on the Reference Type, they receive information about the object & method
    // And sets `this` to `sam`

    // Operations like let hi = sam.hi discards the reference type, and you lose `this`

    // Arrow functions & this
    // Arrow functions have no `this`
    let man = {
        name: 'ilya',
        sayHi() {
            let arrow = () => console.log(this.name); // lexical context's this, in this case, man
            arrow();
        },
        doWop: () => console.log(this) // lexical context's this, in this case, global object
    };

    man.sayHi(); // ilya
    man.doWop();
};