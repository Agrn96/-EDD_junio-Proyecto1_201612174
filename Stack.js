class Node_Stack {
    constructor(isbm, nombre_autor, nombre_libro, numero, categoria, next = null) {
        this.isbm = isbm;
        this.nombre_autor = nombre_autor;
        this.nombre_libro = nombre_libro;
        this.numero = numero;
        this.categoria = categoria;
        this.stack_next = null; // Node for stack
        this.list_next = null; // Node for list
    };
}

class Stack {
    constructor() {
        this.head = null;
    };

    pop() {
        if (this.head != null) {
            let current = this.head;
            while (current.stack_next != null) {
                current = current.stack_next;
            };
            current.stack_next = null;
        }
    }

    push(isbm, nombre_autor, nombre_libro, numero, categoria) {
        let node = new Node_Stack(isbm, nombre_autor, nombre_libro, numero, categoria);
        if (this.head === null) {
            this.head = node;
            let rand = this.head;
            for (let i = 1; i <= numero; i++) {
                let temp = new Node_Stack(isbm, nombre_autor, nombre_libro, i, categoria);
                rand.stack_next = temp;
                rand = rand.stack_next;
            }
        };
    }

    display() {
        let current = this.head;
        console.log("Head: " + current.isbm);
        let temp = current.stack_next;
        while (temp != null) {
            console.log(temp.numero);
            temp = temp.stack_next;
        }
        console.log("\n");

    };

    graph() { // Displays only one pila
        let str = "";
        str = "digraph G{\nlabel=\" Stack \";\nsize=7; \nnode [shape=circle];\n rankdir=TB; \n";
        if (this.head) {
            let current = this.head;
            let books = 1;
            str += "node1";
            str += '[label="ISBM: ' + current.isbm + " Nombre: " + current.nombre_libro + '"];\n';
            let temp = current.stack_next;
            while (temp != null) {
                str += "book" + books + '[label="Nombre: ' + current.nombre_libro + " Numero: " + books + '"];\n';
                if (books === 1) {
                    str += "node1 -> book" + books + "\n";
                } else {
                    str += "book" + (books - 1) + " -> book" + books + "\n";
                }
                temp = temp.stack_next;
                books++;
            }
        }
        str += '}';
        console.log(str);
        d3.select("#graph3").graphviz().width(1000).height(650).renderDot(str);
    }
}

var pila = new Stack();