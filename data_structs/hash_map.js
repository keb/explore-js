/**
 * A Hash Map is a data structure that implements an associative array data type.
 * A structure that can map keys to values. A hash table uses a hash function to
 * compute an index into an array of buckets or slots, from which the desired value can be found.
 * 
 * Ideally, the hash function will assign each key to a unique bucket, but most hash table
 * designs employ an imperfect hash function, which might cause hash collisions where the
 * hash function generates the same index for more than one key. Such collisions must be
 * accommodated in some way. 
 * 
 * In a well-dimensioned hash table, the average cost (number of instructions)
 * for each lookup is independent of the number of elements stored in the table.
 * 
 * In many situations, hash tables turn out to be on average more efficient than search trees
 * or any other table lookup structure. For this reason, they are widely used in many kinds
 * of computer software, particularly for associative arrays, database indexing, caches, and sets.
 * 
 * Time Complexity:
 * Access:    N/A
 * Search:    O(1), worst: O(n)
 * Insertion: O(1), worst: O(n)
 * Deletion:  O(1), worst: O(n)
 */

function HashMap() {
    this.list = [];
}

HashMap.prototype.hash = function(key) {
    /**
     * Let me put this as straightforwardly as possible:
     * hashing is what makes hash tables extremely efficient.
     * No magic. Nothing more. Nada. Just a simple, clever, ingenious idea.
     * 
     * Of course, picking a fast hashing function is very important.
     * If our hash(key) runs in a few seconds, our function will be
     * quite slow regardless of its complexity.
     * 
     * At the same time, it’s very important to make sure that our hashing
     * function doesn’t produce a lot of collisions, as they would be
     * detrimental to the complexity of our hash table.
     * 
     * the complexity of a hash table depends on the hashing function you pick.
     * The more collisions you generate, the more the complexity tends toward O(n).
     * 
     * A hashing function such as 'const hash = key => 0` would have a complexity of O(n)
     * Because there would be a collision every time, and in order to resolve your collision,
     * you'll have to iterate over 'n' elements to find WHICH key at index 0 you wanted
     * 
     * Here, I use 'string-hash' available on NPM:
     * https://github.com/darkskyapp/string-hash/blob/master/index.js
     */

    let hash = 5381;
    let i = key.length;

    while (i) {
        hash = (hash * 33) ^ key.charCodeAt(--i);
    }

    // JavaScript does bitwise operators on 32-bit signed integers.
    // Since we want results to always be positive, convert signed int to unsigned bitshift
    return hash >>> 0;
}

HashMap.prototype.get = function(key) {
    return this.list[ this.hash(key) ];
}

HashMap.prototype.set = function(key, val) {
    this.list[ this.hash(key) ] = val;
}

let m = new HashMap();
m.set('x', 1);
m.set('y', 2);

console.time('with very few records in the map')
m.get('I_DONT_EXIST')
console.timeEnd('with very few records in the map')

m = new HashMap();

for (x = 0; x < 1000000; x++) {
  m.set(`element${x}`, x);
}

console.time('with lots of records in the map');
m.get('I_DONT_EXIST');
console.timeEnd('with lots of records in the map');