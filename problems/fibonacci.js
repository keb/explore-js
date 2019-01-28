// const fastFib = memoize(fib);

// function fib(n) {
//     if (n <= 1)
//         return 0;
//     if (n <= 2)
//         return 1;
//     return fastFib(n - 1) + fastFib(n - 2);
// }

// console.log( fib(7) );

const fastFib = memoize(n => {
    // if (n < 2)
    //     return n; // for this one, n = 1 will correspond to 1, not 0
    if (n <= 1)
        return 0;
    if (n <= 2)
        return 1;
    return fastFib(n - 1) + fastFib(n - 2);
});

console.log(fastFib(13));

function memoize(fn) {
    const cache = {};

    return function(...args) {
        if (cache[args]) return cache[args]

        const newResult = fn.apply(null, args);
        cache[args] = newResult;
        return newResult;
    }
}

const fibArr = n => {
    if (n <= 1)
        return [0];
    if (n <= 2)
        return [0, 1]
    let list = fibArr(n - 1);
    return [...list, list[n - 2] + list[n - 3]];
};

console.log( fibArr(13) );