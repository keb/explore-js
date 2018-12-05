module.exports = () => {
    'use strict';

    // When a function is executed as `new Function(...)`, it does these things:
        // A new empty object is created and assigned to `this`
        // The function body executes. Usually, it modifies this by adding properties to it
        // The value of `this` is returned

    function User(name) {
        // implicit `this = {};`

        this.name = name;
        this.isAdmin = false;

        // implicit `return this;`
    }

    let user = new User('Jack');

    // Another trick, although the constructor is not saved anywhere, just executed once
    let doug = new function() {
        this.name = 'Doug';
        this.isAdmin = false;
    };

    console.log(doug) // { name: 'Doug', isAdmin: false }

    // Inside a function, you can check whether it was called with the `new` operator
    function Dog() {
        console.log(new.target);
    }

    Dog(); // undefined
    new Dog(); // function Dog {...}

    // If you return within a constructor, the rule is:
        // If you return an object, it is returned instead of `this`
        // If you return a primitive or anything else, it is ignored, and `this` is returned
    
    function John() {
        this.name = 'John';
        return { name: 'Godzilla' };
    }

    console.log( new John().name ); // Godzilla

    function Cat(name) {
        this.name = name || 'Garfield';

        this.meow = function() {
            console.log(`My name is ${this.name} and I say meow!`);
        }
    }

    let kitty = new Cat();
    kitty.meow();

    // We can add methods by adding to the .prototype object of Cat
    // `Cat` is a constructor function. its prototype is Function.prototype
    // Any object's prototype is accesible by __proto__
    // `Cat` constructor has a property called `prototype` that you can add methods/properties to

    Cat.prototype.bark = function() { console.log(`My name is ${this.name} and I say bark!`); };
    Cat.prototype.moo = () => console.log(`My name is ${this.name} and I say moo!`); // Lexical this is global object here.

    kitty.bark();
    kitty.moo(); // My name is undefined and I say moo!

    // Can also use factory functions if you don't want to use new operator
    let protoKitty = {
        meow() {
            console.log(`My name is ${this.name} and I say meow!`);
        }
    };

    function makeKitty(name) {
        let kitty = Object.create(protoKitty);
        kitty.name = name || 'Garfield';
        return kitty;
    }

    let fluffy = makeKitty('Fluffy');
    fluffy.meow();

    protoKitty.bark = function() {
        console.log(`My name is ${this.name} and I say bark!`);
    };

    fluffy.bark(); // My name is Fluffy and I say bark!
};