const a = { one: 1 }
const objs = [];

// Randomly make array of objs
for (let i = 0; i < 1000; i++) {
    if (Math.random() > 0.5) {
        // Push unique object
        objs.push({...a});
    } else {
        // Push reference
        objs.push(a);
    }
}

// ES6 Set Version
const uniq1 = objs => Array.from(new Set(objs));

// Without-Set Version
const uniq2 = objs => {
    return objs.reduce((acc, x) => {
        if (acc.indexOf(x) === -1) acc.push(x);
        return acc;
    }, []);
};

// Imperative Version
const uniq3 = objs => {
    const seen = [];
    const toSkip = [];

    for (let i = 0; i < objs.length; i++) {
        if (seen.indexOf(objs[i]) < 0) {
            seen.push(objs[i]);
        } else {
            toSkip.push(i);
        }
    }

    const newList = [];

    for (let i = 0; i < objs.length; i++) {
        if (toSkip.indexOf(i) > -1) continue;
        newList.push(objs[i]);
    }

    return newList;
};

// Results

console.time('ES6 Set Version');
console.log( 'New List Length: ' + uniq1(objs).length );
console.timeEnd('ES6 Set Version');

console.time('Without Set Version');
console.log( 'New List Length: ' + uniq2(objs).length );
console.timeEnd('Without Set Version');

console.time('Imperative Version');
console.log( 'New List Length: ' + uniq3(objs).length );
console.timeEnd('Imperative Version');