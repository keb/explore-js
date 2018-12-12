module.exports = () => {
    // Constructor function pattern
    function Animal(name) {
        this.name = name;
    }

    Animal.prototype.identify = function() {
        return 'I am ' + this.name;
    }

    function Dog(name) {
        Animal.call(this, name);
    }

    Dog.prototype = Object.create(Animal.prototype);

    Dog.prototype.speak = function() {
        console.log("Hello, " + this.identify() + ".");
    };

    let flitch = new Dog("Flitch");
    let haku   = new Dog("Haku");

    flitch.speak();
    haku.speak();

    // Delegation, or, Linking Objects Together
    const Feline = {
        init: function(name) {
            this.name = name;
        },

        identify: function() {
            return "I am " + this.name;
        }
    };

    const Cat = Object.create(Feline);

    Cat.speak = function() {
        console.log("Hello, " + this.identify() + ".");
    };

    let whisky = Object.create(Cat);
    whisky.init("Whisky");

    let charlie = Object.create(Cat);
    charlie.init("Charlie");

    whisky.speak();
    charlie.speak();
};