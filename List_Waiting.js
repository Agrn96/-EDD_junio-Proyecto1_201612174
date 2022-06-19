class Node_Waiting {
    constructor(dpi, user, isbm, nombre_autor, nombre_libro, categoria) {
        this.dpi = dpi;
        this.user = user;
        this.isbm = isbm;
        this.nombre_autor = nombre_autor;
        this.nombre_libro = nombre_libro;
        this.categoria = categoria;
        this.stack_next = null; // Node for stack
        this.list_next = null; // Node for list
    };
}

class Waiting {
    constructor() {
        this.head = null;
    };

    pop() {
        if (this.head != null) {
            let current = this.head;
            if (current.next == null) {
                this.head = null;
            } else if (current.next == this.fin) {
                this.head = this.fin;
                this.fin = null;
                this.head.next = null;
                this.head.prev = null;
            }
            else {
                let temp = this.head;
                this.head = this.head.next;
                this.head.prev = this.fin;
                this.fin.next = this.head;
            }
        };
    }


    push(dpi, user, isbm, nombre_autor, nombre_libro, categoria) {
        let node = new Node_Waiting(dpi, user, isbm, nombre_autor, nombre_libro, categoria);
        if (this.head === null) {
            this.head = node;
        } else if (this.head.list_next === null) {
            this.head.list_next = node;
        } else {
            let current = this.head;
            while (current.list_next != null) {
                current = current.list_next;
            }
            current.list_next = node;
            return;
        }
    };

    display() {
        let current = this.head;
        while (current != null) {
            console.log("Book: " + current.isbm);
            current = current.list_next;
        }
    };

    graph() { // Displays the waiting list
        let str = "";
        str = "digraph G{\nlabel=\" Cola de Espera \";\nsize=7; \nnode [shape=circle];\n rankdir=TB; \n";
        if (this.head) {
            console.log("!")
            let current = this.head;
            let counter = 0;
            while (current) {

                console.log(counter, current.isbm);
                str += "\nnode" + counter;
                str += '[label="Nombre: ' + current.user + "\\nLibro: " + current.nombre_libro + '"];\n';

                if (current.list_next === null) {
                    str += "node" + counter;
                } else {
                    str += "node" + counter + " -> node" + (counter + 1) + "[dir= \"both\" ];\n";
                }
                current = current.list_next;
                counter++;
                if (current === this.head && counter != 0) {
                    break;
                }
            }

        }
        str += '}';
        //console.log(str);
        d3.select("#graph3").graphviz().width(1000).height(650).renderDot(str);
    }
}

var wait1 = new Waiting();