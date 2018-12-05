module.exports = () => {
    // The class syntax does this
        // Declares a variable User that references the function named 'constructor'
        // Puts methods listed in the definition into User.prototype
        // Here, it includes sayHi and the constructor
    // All code inside the class construct is automatically in strict mode
    class User {
        constructor(name) {
            this.name = name;
        }

        sayHi() {
            console.log(this.name);
        }
    }

    let user = new User('Bob');
    user.sayHi();

    console.log(User === User.prototype.constructor); // true
    console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

    console.log(User.__proto__ == Function.prototype); // true
    console.log(User.prototype.__proto__ == Object.prototype); // true

    console.log(User);
    // While the string represetation of console.log(User) may vary, it is still a function;
    // there is no separate "class" entity in JavaScript

    console.log( Object.keys(user) ); // name
    // Class methods are non-enumerable, so they dont show up with Object.keys or a for..in loop

    // Getters & Setters
    class Dog {
        constructor(name) {
            // invokes the setter
            this.name = name;
        }

        get name() {
            // can call this whatever you want really
            // conventionally, this._name
            // but i used this.poo to demonstrate that there is no magic
            return this.poo;
        }

        set name(s) {
            if (s.length < 4) {
                console.log('name too short');
                return;
            }
            this.poo = s;
        }
    }

    let woofer = new Dog('Flitch');
    console.log(woofer.name);

    console.log( Object.getOwnPropertyNames(Dog.prototype) ); // constructor, name
    console.log( Dog.prototype.constructor == Dog ) // true
    console.log( Dog.__proto__ == Function.prototype ); // true

    // Classes can be used as expressions
    function makeClass(name) {
        return class {
            sayHi() {
                console.log(name);
            }
        };
    }

    let Foo = makeClass('Foobawr');
    let bar = new Foo();
    bar.sayHi();

    // Classes can have static methods
    class Cat {
        static staticMethod() {
            console.log(this === Cat);
        }
    }

    // This is essentially the same as doing this
    function OtherCat() {  }
    OtherCat.staticMethod = function() {
        // `this` refers to the function `OtherCat`, NOT an instance of OtherCat
        console.log(this === OtherCat);
    }

    let meower = new OtherCat();
    console.log( Object.getOwnPropertyNames(meower) ); // nothing! the static method is inside OtherCat
    console.log( Object.getOwnPropertyNames(OtherCat) ); // length, name, arguments, caller, prototype, & staticMethod
    OtherCat.staticMethod(); // true

    // Pratical use of static method
    class Article {
        constructor(title, date) {
            this.title = title;
            this.date = date;
        }

        static compare(a, b) {
            return a.date - b.date;
        }
    }

    let articles = [
        new Article('mind', new Date(2016, 1, 1)),
        new Article('body', new Date(2016, 0, 1)),
        new Article('soul', new Date(2016, 11, 1))
    ];

    articles.sort(Article.compare);

    console.log(articles);

    // Lets add another static method
    // This one generates an Article for today
    Article.createTodays = function() {
        // the `this` context will refer to `Article`
        return new this('Todays digest', new Date());
    };

    let today = Article.createTodays();

    console.log(today);
};