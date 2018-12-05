module.exports = () => {
    let animal = { eats: true };
    let dog = { barks: true };

    dog.__proto__ = animal;

    console.log(dog.__proto__ == animal); // true
    console.log(animal.__proto__ == Object.prototype); // true

    console.log(dog.barks); // true
    console.log(dog.eats); // true

    // A more succinct way
    let cat = {
        __proto__: animal,
        meows: true
    };

    console.log(cat.eats); // true

    // There are two limitations:
        // References can't go in circles. JS will throw error if you try to assign __proto__ in a circle
        // The value of __proto__ can be either an object or null. All other values are ignored

    // Exploration of the `this` reference
    let user = {
        name: 'john',
        surname: 'smith',

        set fullName(v) {
            [this.name, this.surname] = v.split(' ');
        },

        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

    let admin = {
        __proto__: user,
        isAdmin: true
    };

    console.log(admin.fullName); // john smith
    admin.fullName = 'douglas crockford';
    console.log(admin.fullName); // douglas crockford // fullName was assigned to admin; so now instead of going up the prototype chain, we just look at admin
    console.log(user.fullName); // john smith

    // No matter where the method is found: in an object or its prototype. In a method call, this is always the object before the dot.
    /**
     * If we call obj.method(), and the method is taken from the prototype,
     * this still references obj.
     * So methods always work with the current object even if they are inherited.
     */

    /** Eric Elliot Land */
    
     // Delegation / Differential Inheritance
     // A delegate prototype is an object that serves as a base for another object
        // in the above case, it would be user

    const proto = {
        // can't do this because arrow func doesnt create this context
        // hello: () => `hello my name is ${this.name}`
        stats: { one: 1, two: 2 },
        hello() {
            return `hello my name is ${this.name}`;
        }
    };

    // Property delegation can be avoided by doing `Object.create(null)`
    const greeter = name => Object.assign(Object.create(proto), { name });

    const george = greeter('george');
    const bill = greeter('bill');

    console.log( george.hello() );
    console.log( bill.hello() );
    
    // The problem with this delegation is that if george want to mutate his stats.one,
    // it mutates for everyone descendent of proto!

    george.stats.one = 3;
    console.log(proto.stats.one == george.stats.one); // true
    console.log(bill.stats.one == george.stats.one); // true

    // Concatentative Inheritance / Cloning / Mixins
    // The process of copying the properties from one object to another,
    // without retaining reference between two objects
    // Cloning is a great way to store default state for objects

    const protoman = {
        hello() {
            return `hello my robot name is ${this.name}`;
        }
    };

    const megaman = Object.assign({}, protoman, { name: 'Mega' });
    console.log( megaman.hello() );

    // Functional Inheritance
};