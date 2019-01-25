/**
 * 
 * A Linked List is a linear collection of data elements, in which linear order is
 * not given by their physical placement in memory. Instead, each element points to 
 * the next. It is a data structure consisting of a group of nodes which together 
 * represent a sequence.
 * 
 * Simple linked lists by themselves do not allow random access to the data or any
 * form of efficient indexing, many basic operations—such as obtaining the last node
 * of the list, finding a node that contains a given datum, or locating the place
 * where a new node should be inserted—may require iterating through most or all of
 * the list elements.
 * 
 * More disadvantages:
 *  They use more memory than arrays because of the storage used by their pointers.
 * 
    Nodes in a linked list must be read in order from the beginning as linked lists
        are inherently sequential access.

    Nodes are stored incontiguously, greatly increasing the time periods
        required to access individual elements within the list, especially with a CPU cache.

    Difficulties arise in linked lists when it comes to reverse traversing.
        For instance, singly linked lists are cumbersome to navigate backwards[1]
        and while doubly linked lists are somewhat easier to read, memory is
        consumed in allocating space for a back-pointer.
 *
 * Time Complexity:
 * Access:    O(n)
 * Search:    O(n)
 * Insertion: O(1) -- O(n) when the last element is unknown
 * Deletion:  O(1) -- O(n) when the last element is unknown
 * 
 */

function Node(value, next = null) {
    this.value = value;
    this.next = next;
}

function LinkedList() {
    this.head = null;
    this.tail = null;
}

/**
 * Insertion: O(1)
 */
LinkedList.prototype.add = function(value) {
    const node = new Node(value);

    if (this.head === null) {
        this.head = node;
        this.tail = node;
    } else {
        this.tail.next = node;
        this.tail = node;
    }
};

/**
 * Search: O(n)
 */
LinkedList.prototype.search = function(value) {
    let node = this.head;

    while (node !== null && node.value !== value) {
        node = node.next;
    }

    if (node === null) return false;
    return true;
};

/**
 * Deletion: O(1)
 */
LinkedList.prototype.delete = function(value) {
    if (this.head === null) return false;
    let node = this.head;

    if (node.value === value) {
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
    }

    while (node.next !== null && node.next.value !== value) {
        node = node.next;
    }

    if (node.next !== null) {
        if (node.next === this.tail) {
            this.tail = node;
        }

        node.next = node.next.next;
        return true;
    }

    return false;
}

/**
 * Access: O(n)
 */
LinkedList.prototype.traverse = function* () {
    let node = this.head;

    while (node !== null) {
        yield node.value;
        node = node.next;
    }
};

const ll = new LinkedList();

for (let i = 1; i <= 15; i++) {
    ll.add(i);
}

ll.delete(10);

const gen = ll.traverse();
for (let i of gen) {
    console.log(i);
}