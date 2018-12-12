module.exports = () => {
    let user = {};
    user = new Object();

    user.name = 'John';
    user.country = 'USA';
    user.dob = '10/25/72';
    user.age = 32;
    
    console.log('Age in user', 'age' in user);

    // Delete a property
    console.log('Delete a property: user.age')
    delete user.age;

    console.log('Age in user', 'age' in user);

    // The `in` operator returns true for properties defined in prototypes
    console.log('toString in user?', 'toString' in user);

    // So you might want to use .hasOwnProperty
    console.log('user.hasOwnProperty("toString")?', user.hasOwnProperty('toString'));

    // Enumerable properties are those properties whose internal enumerable flag is set to true,
    // which is the default for properties created via simple assignment or via a property initializer
    // (properties defined via Object.defineProperty and such default enumerable to false).
    // Enumerable properties show up in for...in loops unless the property's key is a Symbol.
    // Ownership of properties is determined by whether the property belongs to the object
    // directly and not to its prototype chain.

    // Lets define an un-enumerable property on user
    Object.defineProperty(user, 'p2', {
        enumerable: false,
        value: 200
    });

    console.log('Unenumerable property:', user.p2);

    // for...in loop
    // To walk over keys in an object
    // for...in iterates over all non-Symbol, ENUMERABLE properties of an object
    for (let key in user) {
        console.log(`prop: ${key} in user`); // name, country, dob
    }

    // 'p2' is not logged, because it is not enumerable
    // Neither are native methods like 'toString'

    // Object.keys returns only enumerable properties
    let keys = Object.keys(user);
    console.log(keys); // name, country, dob
    
    // getOwnPropertyNames gives all OWN properties
    // Native methods like 'toString' are not included because they are not 'own' properties
    // They are defined in Object.prototype
    let ownPropertyNames = Object.getOwnPropertyNames(user);
    console.log(ownPropertyNames);

    user.hasOwnProperty('p2'); // true
    user.propertyIsEnumerable('p2'); // false;

    // Are objects ordered? In other words, do we get all properties in the same order they were added? Can we rely on this?
    // Integer properties are sorted, others appear in creation order.

    // Objects are stored and copied by reference
    // As Arrays are actually Objects, they are also copied by reference
    let foo = 'test'; // strings are primitive values
    let bar = foo;
    foo = 'not test';
    console.log('bar will still equal "test" because primitives are not objects:', bar);

    // A variable stores NOT the object itself, but its address in memory. or a Reference to it
    // Equality and strict equality operators for objects work exactly the same == & ===

    // Cloning and merging using Object.assign
    // We used to have to loop through the keys & values of one object and assign them to a new empty one
    // Now we can do this: Object.assign(dest[, src1, src2, src3...]); note, this will overwrite properties if they exist
    let orig = { a: 20, b: 40, c: { nested_prop: 60 } };
    let clone = Object.assign({}, orig);

    // The problem here is that orig.c and clone.c STILL reference the same object
    // So this is not a complete copy.
    // What you need is DEEP-cloning, which could be implemented yourself or found in libs like lodash, or rambda

    console.log(user);
};