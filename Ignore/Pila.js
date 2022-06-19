
class Node_Pila {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class Pila {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insert(data) {
        if (!this.head) {
            this.insertFirst(data);
        } else {
            this.insertLast(data);
        }
    }
    // Insert first node
    insertFirst(data) {
        this.head = new Node_Pila(data, this.head);
        this.size++;
    }

    // Insert last node
    insertLast(data) {
        let node = new Node_Pila(data);

        // If empty, make head
        if (!this.head) {
            this.head = node;
        } else if (!this.fin) {
            this.fin = node;
            this.head.next = this.fin;
            this.head.prev = this.fin;
            this.fin.prev = this.head;
            this.fin.next = this.head;
        } else {
            let current = this.fin;
            current.next = node;
            this.fin = node;
            this.fin.next = this.head;
            this.fin.prev = current;
            this.head.prev = this.fin;
        }
        this.size++;
    }
    // Insert at index
    insertAt(data, index) {
        // If index is out of range
        if (index > 0 && index > this.size) {
            return;
        }
        // If first index
        if (index == 0) {
            this.head = new Node(data, this.head);
            return;
        }

        const node = new Node_Pila(data);
        let current, previous;

        // Set current to first
        current = this.head;
        let count = 0;

        while (count < index) {
            previous = current; // Node before index
            current = current.next;
            count++;
        }

        node.next = current;
        previous.next = node;

        this.size++;
    }
    // Get at index

    getAt(index) {
        let current = this.head;
        let count = 0;

        while (current) {
            if (count == index) {
                console.log(current.data);
                return;
            }
            count++;
            current = current.next;
        }

        return;
    }

    pop() {
        if (this.fin == null) {
            if (this.head == null) {
                console.log("Pila Vacia");
                return;
            } else if (this.head) {
                let temp = this.head.data;
                this.clearList();
                return temp;
            }
        } else if (this.head.next == this.head) {
            let temp = this.head.data;
            this.clearList();
            return temp;
        } else {
            let temp = this.fin;
            this.fin = this.fin.prev;
            this.fin.next = this.head;
            this.head.prev = this.fin;
            return temp.data;
        }
    }
    // Remove at index
    removeAt(index) {
        if (index > 0 && index > this.size) {
            return;
        }
        let current = this.head;
        let previous;
        let count = 0;

        // Remove first
        if (index == 0) {
            this.head = current.next;
        } else {
            while (count < index) {
                count++;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.size--;
        return;
    }
    // Clear list
    clearList() {
        this.head = null;
        this.size = 0;
    }
    // Print list data
    printListData() {
        let current = this.head;
        let stop = false;
        while (current) {
            console.log(current.data);
            current = current.next;
            stop = true;
            if (current === this.head && stop === true) {
                break;
            }
        }
    }

    printListDataR() {
        let current = this.fin;
        let stop = false;
        while (current) {
            console.log(current.data);
            current = current.prev;
            stop = true;
            if (current === this.fin && stop === true) {
                break;
            }
        }
    }

    graph(divName) {
        let str = "";
        str = "digraph G{\nlabel=\" Pila Carnet \";\nnode [shape=circle];\n rankdir=LR \n";
        if (this.head) {
            let current = this.head;
            let counter = 0;
            while (current) {
                if (current === this.head && counter != 0) {
                    break;
                }
                str += "node" + counter;
                str += '[label="';
                str += current.data;
                str += '"];\n';
                if (current === this.fin) {
                    str += "node" + counter;
                    str += ";\n";
                } else if (current.next) {
                    str += "node" + counter;
                    str += "->";
                    str += "node" + (counter + 1) + "[dir= \"both\" ]";
                    str += ";\n";
                }
                stop = true;

                current = current.next;
                counter++;
            }
            str += "node" + (counter - 1) + " -> " + "node0" + "[dir= \"both\" constraint=false];\n";
            str += "rank=same;"
        }
        str += '}';
        d3.select(divName).graphviz().renderDot(str);
        //return str;
    }
    

}
var pila = new Pila();
var pila2 = new Pila();

function popGraph() {
    let temp = pila.pop();
    if (temp === null) {
        return;
    }
    pila2.insert(temp);

    pila.graph("#graph");
    pila2.graph("#rand");

    console.log("Pila 1");
    pila.printListData();
    console.log("Pila 2");
    pila2.printListData();

}



pila.insert(2);
pila.insert(0);
pila.insert(1);
pila.insert(6);
pila.insert(1);
pila.insert(2);
pila.insert(1);
pila.insert(7);
pila.insert(4);
pila.printListData();
pila.graph("#graph");
pila2.graph("#rand");