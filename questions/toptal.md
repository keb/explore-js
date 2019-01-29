https://www.toptal.com/javascript/interview-questions

### What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

The problem here is that `null` is also considered an object. Therefore `typeof null === 'object'` logs `true`.
This problem can be easily avoided by also check if bar is null.

So then: `(bar !== null) && (typeof bar === 'object')`

To be entirely thorough, this solution will return false if bar is a function. In most cases, this is desired.
But in case you want to include functions as objects:

`(bar !== null) && ((typeof bar === 'object') || (typeof bar === 'function'))`

This one will still return true for Arrays though. If you want to exclude Arrays:

`(bar !== null) && (typeof bar === 'object') && (toString.call(bar) !== "[object Array]")`

Even better, this alternative returns false for nulls, arrays, functions, but true for objects:

`((bar !== null) && (bar.constructor === Object))`

### What will the code below output to the console and why?

```
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```

Since both `a` and `b` are defined within the enclosing scope of the function, and since the line they are begins with var keyword, most devs would expect them to be undefined.

However, `var a = b = 3` is shorthand for:

```
b = 3;
var a = b;
```

As a result, ~if you are not using strict mode`, the output of the code should look like this:
```
a defined? false
b defined? true
```

`b` ends up being a global variable, and is therefore still in the scope even outside of the enclosing function. In strict mode, this would generate an error because b is initialized before it is declared.

### What will the code below output to the console and why?

```
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
```

It will output this:
```
outer func: this.foo = bar
outer func: self.foo = bar
inner func: this.foo = undefined
inner func: self.foo = bar
```
In the outer function, both this and self refer to `myObject` and therefore both can properly reference `foo`

In the inner function, `this` no longer refers to myObject. As a result, `this.foo` is undefined. whereas the reference ot the local variable `self` remains in scope via closure, and is accessible there.

### What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

To prevent variable naming conflicts with the outer scope.

Some libraries do this in order to allow for an easily referencable alias for a global variable:

`(function($) { /* jQuery plugin code referencing $ */ } )(jQuery);`

### What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

* `use strict` is a way to voluntarily enforce stricter parsing and error handling.

* Code errors that would otherwise have been ignored throw errors or exceptions.
* Prevents accidentaly globals. Without strict mode, assigning a value to an undeclared variable automatically creates a global variable. Doing this in strict mode throws an error
* Eliminates `this` coercion. Without strict mode, a reference to `this` value of undefined or null is coerced to the global object. With strict mode, throws an error.
* Disallows duplicate parameter values. Throws an error when it detects a duplicate named argument for a function. in ES5, used to disallow duplicate property naming in objects, but as of ES6, no longer does.
* Makes eval() safer.
* Throws error on invalid usage of `delete`. The `delete` operator used to remove properties from objects cannot be used on non-configurable properties of an object. Non-strict code will fail silently when an attempt is made to do this.

### Consider the two functions below. Will they both return the same thing? Why or why not?

```
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
```

No. The first will return an object literal. The second will return undefined.
Not only that, but the second returns undefined without any error being thrown. For this reason, this has to do with the fact that semicolons are technically optional (although omitting them bcan be considered bad form).

As a result, when the line containing the return statement is encountered in `foo2()`, a semicolon is automatically inserted immediately after the return statement. No error is thrown since the remainder of the code is perfectly valid, even though it doesn't ever get invoked or do anything.

### What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

`NaN` means 'Not a Number'.
However, `console.log(typeof NaN === 'number'); // logs true`

Additionally, `NaN` compared to anything, even itself, is false.
A semi-reliable way to check whether a number is equal to `NaN` is using the built-in `isNan()`. ES6 introduced `Number.isNaN()` which is more reliable than the built in `isNaN()`.

### What will the code below output? Explain your answer.

```
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```

It will output this:
```
0.300000000000004
false
```

An educated answer would be: "You can't be sure. It might print out 0.3 and true, or it might not. Numbers in JavaScript are all treated with floating point precision, and as such, may not always yield expected results."

A typical solution would be this. Note, `Number.EPSILON` represents the difference between 1 and the smallest floating point number greater than 1.
```
const areNumbersAlmostEqual(x, y) => Math.abs(x - y) < Number.EPSILON
```

### Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

Here is one way:
```
const isInteger = x => {
    return !Number.isNaN(x) && (Math.round(x) === x);
};
```

This is built into ES6 now:
```
Number.isInteger()
```

The issue is that in ECMAScript, integers only exist conceptually; ALL numeric values are stored as floating point values. For this reason, the simplest and cleanest pre-ES6 solution would be to use the bitwise XOR operator:

```
const isInteger = x => x ^ 0 === x;
```

### In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

```
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```

They will be logged in this order:
```
1
4
3
2
```
* 1 and 4 will be logged first since they are synchronous calls to console.log without delay.
* 2 is displayed after 3 because 2 is loged after a delay of 1000 ms (1 second), whereas 3 is delayed after 0ms.

But why does 3 get logged after 4?
The answer lies in understanding JavaScript events and timing.

The browser has an event loop which checks the event queue and processes pending events. For example, if an event happens in the background (e.g., a script onload event) while the browser is busy (e.g., processing an onclick), the event gets appended to the queue. When the onclick handler is complete, the queue is checked and the event is then handled (e.g., the onload script is executed).

Similarly, setTimeout() also puts execution of its referenced function into the event queue if the browser is busy.

When a value of zero is passed as the second argument to setTimeout(), it attempts to execute the specified function “as soon as possible”. Specifically, execution of the function is placed on the event queue to occur on the next timer tick. Note, though, that this is not immediate; the function is not executed until the next tick. That’s why in the above example, the call to console.log(4) occurs before the call to console.log(3) (since the call to console.log(3) is invoked via setTimeout, so it is slightly delayed).

### Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

```
const isPalindrome = s => s === s.split('').reverse().join('');
```

Replace spaces, and make lowercase:
```
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}
```

### Write a sum method which will work properly when invoked using either syntax below.

```
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```

Here:
```
function sum(...args) {
    if (args.length < 2) {
        const cached = args[0];
        return x => cached + x;
    }

    let sum = 0;

    for (i of args) {
        sum += i;
    }

    return sum;
}
```

### Consider the following code snippet.
### What gets logged to the console when the user clicks on "Button 4" and why?
### Provide one or more alternate implementations that will work as expected.

```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

1. No matter what button the user clicks, the number 5 will always be logged.
This is because, at the point the onclick method is invoked, the for loop is already completed, and i = 5. (Bonus points for interviewee if they know enough to talk about how execution contexts, variable objects, activation objects, and hte internal 'scope' property contribute to closure behavior).

2. Using ES6's `let` operator fixes this.

```
for (let i = 0; i < 5; i++) {
    const btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', () => console.log(i));
    document.body.appendChild(btn);
}
```

### Assuming d is an “empty” object in scope, say: `var d = {};`. What is accomplished by using the following code?

```
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
```

`console.log(d); // { zebra: undefined, horse: undefined }`

Ideally, any lookup performed on a JS object with an unset key evalutes to undefined, but running this code marks those properties as 'own properties' of the object.

Passing an object to `Object.keys` will return an array with those set keys as well, even if their values are undefined.

### What will the code below output to the console and why?

```
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```

array 1: length=5 last=j,o,n,e,s
array 2: length=5 last=j,o,n,e,s

Because not only does `arr1.reverse()` alter the same array in memory, but it returns a reference to the same array (arr1). Therefore, from that line on, `arr1` and `arr2` reference the same Array in memory.

### What will the code below output to the console and why ?

```
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);
```

```
"122"
"32"
"02"
"112"
"NaN2"
NaN
```

The fundamental issue here is that JavaScript (ECMAScript) is a loosely typed language and it performs automatic type conversion on values to accommodate the operation being performed. Let’s see how this plays out with each of the above examples.

### The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```

The potential stack overflow can be avoided by modifying the `nextListItem` function as follows:

```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};
```

The stack overflow is eliminated because the event loop handles the recursion, not the call stack. When `nextListItem` runs, if `item` is not null, the timeout function (nextListItem) is pusehd to the event queue and the function exits, thereby leaving the call stack clear. When the event queue runs its timed-out event, the next item is processed and a timer is set to again invoke nextListItem.

### What is a “closure” in JavaScript? Provide an example.

A closure is a function that retains the lexical context in which it was defined, regardless of when or where it is being called.

An example:

```
let makeAdder = x => {
    return y => y + x;
};

let addtwo = makeAdder(2);

let foo = () => {
    console.log( addTwo(2); ) // 4
};

foo();
```

### What will be the output of the following code. Explain your answer. How could the use of closures help here?
```
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```

The output will be:
```
5
5
5
5
5
```

You can easily fix this with the `let` operator. You can fix this with closures like this:
```
for (var i = 0; i < 5; i++) {
	setTimeout((function(num) {
        return () => console.log(num);
    })(i), i * 1000);
}
```

### What would the following lines of code output to the console?

```
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```

This returns:
```
0 || 1 = 1
1 || 2 = 1
0 && 1 = 0
1 && 2 = 2
```

In JavaScript, both || and && are logical operators that return the first fully-determined “logical value” when evaluated from left to right.

### What will be the output when the following code is executed? Explain.

```
console.log(false == '0')
console.log(false === '0')
```

the output will be:
```
true
false
```

The first `==` tries to coerce the values before comparing them. It is then generally good practice to always use `===` and `!==`.

Because the second is a strict type comparison. typeof false is 'bool', where typeof '0' is 'string'

### What is the output out of the following code? Explain your answer.

```
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```

The output will be: `456`

Because when you use an object as a dynamic key, it is automatically converted to a string, which in both cases would be '[object Object]'

### What will the following code output to the console:

```
console.log(
    (function f(n){
        return ((n > 1) ? n * f(n-1) : n)
    })(10)
);
```

The output will be the 10 factorial:
```
10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 = 3628800
```

### Consider the code snippet below. What will the console output be and why?

```
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
```

The output will be:
```
1
```

Because of the closure. When `console.log` is called, `x` in still within its lexical scope.

### What will the following code output to the console and why? What is the issue with this code and how can it be fixed.

```
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```

So this will putput the following:
```
undefined
John Doe
```

The reason being that when`stoleSecretIdentity` references `hero.getSecretIdentity`, it does not carry the same `this` context. Instead, the function is being invoked in the global context (the window object which does not contain a _name property). In order to use the same context, you must bind it to the `hero` object.

So do this instead: `var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);` then call it regularly like this `stoleSecretIdentity()`

Or you can call it using `.call` or `.apply` like this:
`stoleSecretIdentity.call(hero)` or `stoleSecretIdentity.apply(hero)`

### Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function. The arguments to the function should be: a DOM element, a callback function (that takes a DOM element as its argument)

Visiting all elements in a tree (DOM) is a classic Depth-First-Search algorithm application. Here’s an example solution:

```
function Traverse(el, fn) {
    fn(el);
    const list = el.children;
    for (let i = 0; i < list.length; i++) {
        Traverse(list[i], fn); // recurse
    }
}
```

### Testing your this knowledge in JavaScript: What is the output of the following code?

```
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```

This will ouput:
```
10 // This will reference the global object because of where fn is defined
2  // When fn is called as an element of the `arguments` array (which arrays are objects and carry .length properties), it logs the length of the `arguments` array, which after being passed both 'fn, 1', is equal to 2.
```

### Consider the following code. What will the output be, and why?

```
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```

The output will be:
```
1
undefined
2
```
var statements are hoisted (without their value initialization) to the top of the global or function scope it belongs to, even when it’s inside a with or catch block. However, the error’s identifier is only visible inside the catch block. It is equivalent to:

```
(function () {
    var x, y; // outer and hoisted
    try {
        throw new Error();
    } catch (x /* inner */) {
        x = 1; // inner x, not the outer one
        y = 2; // there is only one y, which is in the outer scope
        console.log(x /* inner */);
    }
    console.log(x); // outer
    console.log(y); // outer
})();
```

### What will be the output of this code?

```
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```

The output will be:
```
undefined
```

Neither 21, nor 20, the result is undefined

It’s because JavaScript initialization is not hoisted.

(Why doesn’t it show the global value of 21? The reason is that when the function is executed, it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.)

This is equivalent to:
```
var x = 21;
var girl = function () {
    var x; // This x in this function scope is hoisted to the top
    console.log(x);
    x = 20;
};
girl ();
```

### How do you clone an object?

```
const a = {...existingObject};
const a = Object.assign({}, existingObject);
```

The downfall of using these is that these are shallow copies, and that nested properties that are non-primitives remain as references, not full copies.

### What will this code print?

```
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```

This will print:
```
0
1
2
3
4
```

Thanks to the handy `let` operator which creates variables that are scoped within the for loop & block scoped.

### What do the following lines output, and why?

```
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```

This will print:
```
true
false
```

The first statement returns true which is as expected.

The second returns false because of how the engine works regarding operator associativity for < and >. It compares left to right, so 3 > 2 > 1 JavaScript translates to true > 1. true has value 1, so it then compares 1 > 1, which is false.

### How do you add an element at the begining of an array? How do you add one at the end?

```
arr.unshift(el);
arr.push(el);
```

In ES6, you can also use the spread operator.

### Imagine you have this code.
```
var a = [1,2,3];
```

Will this result in a crash? `a[10] = 999`
What will this output? `console.log(a[6])`

1. No, it won't result in a crash, just a bunch of `empty indexes`.
2. `undefined`

If you try to retrieve these slots, they return `undefined` however, they are not really filled with the `undefined` primitive.

### What is the value of typeof undefined == typeof NULL?

This will be `true` and evaluate to `'undefined' == 'undefined'`.
JavaScript is case sensitive and NULL is different from `null` and just treated as a variable name.

If you were to do `typeof undefined == typeof null` it would evaluate to `'undefined' == 'object'` which would be false.

### What would following code return?
```
console.log(typeof typeof 1);
```

It would return `string` because typeof returns the type of a expression in string form.

### What will the following code output and why?
```
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
```

It will output:
```
b is NaN
3
```

due to hoisting the code in inner will be interpreted as follows:
```
function inner () {
    var b; // b is undefined
    b++; // b is NaN
    b = 3; // b is 3
    console.log(b); // output "3"
}
```