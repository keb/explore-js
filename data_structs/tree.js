/**
 * A Tree is a widely used abstract data type (ADT) —
 * or data structure implementing this ADT—that simulates a hierarchical tree structure,
 * with a root value and subtrees of children with a parent node, represented as a set of linked nodes.
 * 
 * A tree data structure can be defined recursively (locally) as a collection of nodes (starting at a root node),
 * where each node is a data structure consisting of a value,
 * together with a list of references to nodes (the "children"),
 * with the constraints that no reference is duplicated, and none points to the root.
 * 
 */


// Generic / General Tree
/**
 * Each node can have infinite number of children
 * A General Tree can't be empty.
 * There is no limit on the degree of node in a general tree
 * Subtree of general tree are not ordered
 * 
 * to find any one node in the tree would take O(n) time assuming there are n nodes.
 * 
 * Search:    O(n)
 * Insertion: O(1)
 * Deletion:  O(n)
 */

function GNode(val) {
    this.value = val;
    this.children = [];
    this.parent = null;

    this.foo = function() {
        console.log('method in object');
    }
}

GNode.prototype.setParentNode = function(node) {
    this.parent = node;
};

GNode.prototype.getParentNode = function() {
    return this.parent;
};

GNode.prototype.addChild = function(node) {
    node.setParentNode(this);
    this.children.push(node); // Infinite children!
};

GNode.prototype.getChildren = function() {
    return this.children;
};

GNode.prototype.removeChildren = function() {
    this.children = [];
};

// Binary Search Tree
/**
 * A Binary Tree is a data structure in that each node has at most two nodes on left and right
 * A Binary Tree can be empty
 * Nodes in a Binary Tree cannot have more than degree 2
 * Subtree of binary tree is ordered
 * 
 * Binary Search Tree, used for searching
 * A BST is a BT where the left child contains ONLY nodes with values less than the parent node
 * and with right child only contains nodes with values greater than or equal to parent
 * 
 * Access:    O(log(n))
 * Search:    O(log(n))
 * Insertion: O(log(n))
 * Deletion:  O(log(n))
 */

function BTNode(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

BTNode.prototype.traverse = function() {
    let values = [];
    
    if (this.left) {
        values = [...values, ...this.left.traverse()];
    }

    // Add Root
    values.push(this.value);

    if (this.right) {
        values = [...values, ...this.right.traverse()];
    }

    return values;
};

function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype.push = function(val) {
    if (!this.root) {
        this.root = new BTNode(val);
        return;
    }

    let current = this.root;
    const newNode = new BTNode(val);

    while (current) {
        if (val < current.value) {
            if (!current.left) {
                current.left = newNode;
                break;
            } else {
                current = current.left;
            }
        } else {
            if (!current.right) {
                current.right = newNode;
                break;
            } else {
                current = current.right;
            }
        }
    }
};

BinarySearchTree.prototype.traverse = function() {
    if (this.root === null) return [];
    else return this.root.traverse();
}

const bst = new BinarySearchTree();

bst.push(14);
bst.push(10);
bst.push(1);
bst.push(2);
bst.push(4);
bst.push(7);
bst.push(34);
bst.push(11);

console.log(bst.traverse());