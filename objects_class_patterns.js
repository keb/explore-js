module.exports = () => {
    // The `class` keyword is syntax sugar

    // Functional class pattern
    function User(name) {
        this.name = name;
        this.sayHi = function() {
            console.log(this.name);
        };
    }

    let user = new User('Bob');
    user.sayHi();

    // Factory class pattern
    // Kind of like the Revealing Module Pattern
    function Dog(name, birthday) {
        function privateMethod() {
            return 2 + 2;
        }

        return {
            name: name,
            birthday: birthday,
            theNumberFour: privateMethod(),
            bark() {
                console.log('woof, i am: ', name);
            }
        };
    }

    let pupper = Dog('Flitch', '2005');
    pupper.bark();

    // Prototype-based Classes
    // Most important and generally the best
    function Cat(name, birthday) {
        this.name = name;
        this.birthday = birthday;
    }

    Cat.prototype.addTwoNums = function(x, y) {
        console.log(x + y);
    };

    Cat.prototype.meow = function() {
        console.log(`my name is ${this.name} and I say meow!`);
    };

    let kitty = new Cat('Garfield', '1975');
    kitty.meow();
    kitty.addTwoNums(2, 4);

    // In the prototypal pattern, all methods are in User.prototype that is shared between all user objects.
    // An object itself only stores the data.
    // More memory-efficient than the functional pattern, wherein every object has its own copy of every method

    // Prototype-based inheritance for classes
    function Rabbit(name) {
        this.name = name;
    }

    Rabbit.prototype.jump = function() {
        console.log(this.name + ' jumps!');
    }

    function Animal(name) {
        this.name = name;
    };

    Animal.prototype.eat = function() {
        console.log(this.name + ' eats!');
    }

    // Now set up the inheritance chain
    // By default
        // Rabbit.prototype.__proto__ -> Object.prototype
        // Animal.prototype.__proto__ -> Object.prototype

    // So then, we want
    Rabbit.prototype.__proto__ = Animal.prototype;

    // So now:
    // Rabbit.prototype.__proto__ -> Animal.prototype
    // http://javascript.info/article/class-patterns/class-inheritance-rabbit-animal-2.png

    let rabbit = new Rabbit('Mittens');
    rabbit.jump();
    rabbit.eat();
};