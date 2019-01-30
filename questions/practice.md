1. bar may be equal to `null`, and when you do `typeof null` you get `'object'`.
So you would want to check liek this instead `typeof bar === 'object' && bar !== null`
`typeof [a function]` will return `'function'`
`typeof []` will return `'object'`
Plan accordingly.

2. b becomes declared in the global scope when you do `var a = b = 3`
```
false
true
```

3.
```
bar
bar
undefined
bar
```

4. So that you do not have any variable name conflicts with the outer scope.

5. Prevents accidental global variable declarations. Throws errors on certain things that it would otherwsie not.
Without strict mode, a reference to this of a null or defined value is automatically coerced to the global.
Disallows duplicate parameter names

6. foo1 will return an object literal foo2 will return undefined. there is an implicit semicolon after the `return` in foo2

7. NaN stands for not a number. You can use Number.isNaN to check if something is not a number. there is also `isNaN` but is has its downsides.

8. `false`. All numbers in JavaScript are actually floating point values. Whole numbers exist only conceptually. doing 0.1 + 0.2 will equal 0.300000000004~

9. you can do const `isInteger = x => x === Math.round(x)`. You can also use Math.floor or Math.ceil

10.
```
1
4
3
2
```
1 and 4 get pushed onto the call stack. Because 3 and 2 are asynchronous calls, they get pushed on the event queue, which is handled after the enclosing function is popped from the stack.

```
When a value of zero is passed as the second argument to setTimeout(), it attempts to execute the specified function “as soon as possible”. Specifically, execution of the function is placed on the event queue to occur on the next timer tick. Note, though, that this is not immediate; the function is not executed until the next tick. 
```

11. const isPalindrome = s => s === s.split('').reverse().join('')

12.
```
function sum(...args) {
    if (args.length < 2) {
        return x => x + args[0];
    }

    let sum = 0;
    for (let num of args) {
        sum += num;
    }

    return sum;
}
```

13. a. no matter what button you press, its going to log `5` because var i is declared globally.
b. you can use `let` to scope the variable to the for loop, or wrap the function in an IIFE in which you pass `i` as a sole variable
```
btn.addEventListener('click', (function(i) {
    return function() { console.log(i); };
})(i));
```

14. `console.log(d); // { zebra: undefined, horse: undefined }

15. 
```
arr1 [n, h, o, j, [j, o, n, e, s]]
arr2 [n, h, o, j, [j, o, n, e, s]]
arr3 [j, o, n, e, s]
```

16. 
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

17. You can make the recursive call asynchronous, push it onto the event queue instead of the call stack
```
setTimeout(nextListeItem, 2);
```

18. A closure is a function that retains the the context of the lexical scope in which it is defined regardless of when or where it is called.

19.
```
5
5
5
5
5
```
var i is a global variable, and by teh time these functions are called, i is == 5
you can use `let` to fix this, or you can use a closure in this way
```
for (var i = 0; i < 5; i++) {
	setTimeout((function(num) {
        return () => console.log(num);
    })(i), i * 1000);
}
```

20.
```
1
1
0
2
```

21. `true` then `false` because the triple equality operator checks against types

22. 456

23. this is a factorial of 10

24. `1` because of the closure. x is still within its lexical scope

25. _name is undefined. you have to bind stoleSecretIdentity to hero, or use call or apply.

26.
Visiting all elements in a tree (DOM) is a classic Depth-First-Search algorithm application. Here’s an example solution:
```
const traverse = (el, callback) => {
    callback(el);

    for (let i = 0; i < el.children.length; i++) {
        traverse(el.children[i], callback);
    }
};
```

27.
```
10 // This will reference the global object because of where fn is defined
2  // When fn is called as an element of the `arguments` array (which arrays are objects and carry .length properties), it logs the length of the `arguments` array, which after being passed both 'fn, 1', is equal to 2.
```

28.
```
1
undefined
2
```

equivalent to

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

29. ``` undefined ```
because it assumes you are talking about the x that is later defind and initialized within the function, so it hoists the declaration to the top

(Why doesn’t it show the global value of 21? The reason is that when the function is executed, it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.)

30. const a = {...existingObj} or use Object.assign, but these are not deeply merged, you may need an existing lib like lodash for that.

31. 0, 1, 2, 3, 4

32. 
```
true
false
```

because 1 < 2 gets evaluated to true, which has a numeral value of 1, so 1 < 3 is true

then 3 > 2 gets evaluated to true, which is also 1, and 1 > 1 is false

33. arr.unshift(el), and arr.push(el)

34. a. no crash, just a ton of empty slots in the array. b. this will output undefined

35. true
because NULL is treated as a value, so it is undefined. note that js is case sensitive so null and NULL are not the same thing

36. 'string'

37. 3

