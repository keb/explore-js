/**
 * In computer science, a stack is an abstract data type that serves as a collection of elements, with two principal operations:
    push, which adds an element to the collection, and
    pop, which removes the most recently added element that was not yet removed.
 *
 * The order in which elements come off a stack gives rise to its alternative name,
 * LIFO (last in, first out). Additionally, a peek operation may give access to
 * the top without modifying the stack.
 * 
 * Considered as a linear data structure, or more abstractly a sequential collection,
 * the push and pop operations occur only at one end of the structure, referred to as
 * the top of the stack. This makes it possible to implement a stack as a singly linked list
 * and a pointer to the top element. A stack may be implemented to have a bounded capacity.
 * If the stack is full and does not contain enough space to accept an entity to be pushed,
 * the stack is then considered to be in an overflow state.
 * 
 * Time Complexity:
 * Access:    O(n)
 * Search:    O(n)
 * Insertion: O(1) -- O(n) when the last element is unknown
 * Deletion:  O(1) -- O(n) when the last element is unknown
 */

function Stack() {
    this.items = [];
}

Stack.prototype.push = function(item) {
    this.items.push(item);
}

Stack.prototype.pop = function() {
    if (this.items.length === 0) throw new Error('Stack Underflow');
    return this.items.pop();
}

Stack.prototype.peek = function() {
    return this.items[this.items.length - 1];
}

Stack.prototype.isEmpty = function() {
    return this.items.length === 0;
}

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log( stack.pop() );
console.log( stack.pop() );

console.log( stack.peek() );
console.log( stack.peek() );

console.log( stack.isEmpty() );