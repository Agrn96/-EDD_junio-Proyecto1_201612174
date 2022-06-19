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

    pop(isbm) {
        if (this.head != null) {
            let current = this.head;
            while (current != null) {
                if (current.isbm == isbm) {
                    if (current.stack_next != null) {
                        let temp = current.stack_next;
                        while (temp.stack_next.stack_next != null) {
                            temp = temp.stack_next;
                        }
                        temp.stack_next = null;
                        current.numero--;
                        break;
                    }
                }
                current = current.list_next;
            };
        }
        let temp = this.head;
        console.log(":")
    }


    push_stack(isbm, numero, node_) { //Massive add for books
        let node = new Node_Stack(node_.isbm, node_.nombre_autor, node_.nombre_libro, numero, node_.categoria)
        if (isbm.stack_next === null) {
            isbm.stack_next = node;
        } else {
            let current = isbm.stack_next;
            while (current.stack_next != null) {
                current = current.stack_next;
            }
            current.stack_next = node;
        }
    };

    push_list(isbm, nombre_autor, nombre_libro, numero, categoria) {
        let node = new Node_Stack(isbm, nombre_autor, nombre_libro, numero, categoria);
        if (this.head === null) {
            this.head = node;
            for (let i = 1; i <= numero; i++) {
                this.push_stack(this.head, i, node);
            }
            return;
        } else if (this.head.list_next === null) {
            this.head.list_next = node;
            for (let i = 1; i <= numero; i++) {
                this.push_stack(this.head.list_next, i, node);
            }
            return;
        } else {
            let current = this.head;
            while (current.list_next != null) {
                if (current.isbm == isbm) {
                    for (let i = current.numero + 1; i <= current.numero + parseInt(numero); i++) {
                        this.push_stack(current, i, node);
                    }
                    current.numero += parseInt(numero);
                    return;
                }
                current = current.list_next;
            }
            current.list_next = node;
            current = current.list_next;
            for (let i = 1; i <= numero; i++) {
                this.push_stack(current, i, node);
            }
            return;
        }
    };

    display() {
        let current = this.head;
        while (current != null) {
            console.log("Head: " + current.isbm);
            let temp = current.stack_next;
            while (temp != null) {
                console.log(temp.numero);
                temp = temp.stack_next;
            }
            console.log("\n");

            current = current.list_next;
        }
    };

    graph() { //Displays pila of all books
        let str = "";
        str = "digraph G{\nlabel=\" Inicio a fin \";\nsize=7; \nnode [shape=circle];\n rankdir=TB; \n";
        console.log("!")
        if (this.head) {
            console.log("!")
            let current = this.head;
            let counter = 0;
            let book_Row = "\nrank=same;";
            while (current) {
                let books = 1;
                if (current === this.head && counter != 0) {
                    break;
                }
                str += "node" + counter;
                book_Row += "node" + counter + ";";
                str += '[label="ISBM: ';
                str += current.isbm + " Nombre: " + current.nombre_libro;
                str += '"];\n';
                let temp = current.stack_next;
                while (temp != null) {
                    str += "book" + current.isbm + books + '[label="Nombre: ' + current.nombre_libro + " Cantidad: " + books + '"];\n';
                    if (books === 1) {
                        str += "node" + counter + " -> book" + current.isbm + books + "\n";
                    } else {
                        str += "book" + current.isbm + (books - 1) + " -> book" + current.isbm + books + "\n";
                    }
                    temp = temp.stack_next;
                    books++;
                }

                if (current === this.fin) {
                    str += "node" + counter;
                    str += ";\n";
                } else if (current.list_next) {
                    str += "node" + counter;
                    str += "->";
                    str += "node" + (counter + 1) + "[dir= \"both\" ]";
                    str += ";\n";
                }
                current = current.list_next;
                counter++;
            }
            str += "node" + (counter - 1) + " -> " + "node0" + "[dir= \"both\" constraint=false];\n";
            str += "{" + book_Row + "}\n";
        }
        str += '}';
        console.log(str);
        d3.select("#graph").graphviz().width(1000).height(650).renderDot(str);
    }
    //graphviz();

    graph2(isbm) { // Displays only one pila
        let str = "";
        str = "digraph G{\nlabel=\" Inicio a fin \";\nsize=7; \nnode [shape=circle];\n rankdir=TB; \n";
        console.log(isbm);
        if (this.head) {
            console.log("!")
            let current = this.head;
            let counter = 0;
            while (current) {
                let books = 1;
                if (current === this.head && counter != 0) {
                    break;
                }
                console.log(current.isbm, isbm);
                if (current.isbm != isbm) {
                    current = current.list_next;
                    continue;
                }
                str += "node" + counter;
                book_Row += "node" + counter + ";";
                str += '[label="ISBM: ';
                str += current.isbm + " Nombre: " + current.nombre_libro;
                str += '"];\n';
                let temp = current.stack_next;
                while (temp != null) {
                    str += "book" + current.isbm + books + '[label="Nombre: ' + current.nombre_libro + " Cantidad: " + books + '"];\n';
                    if (books === 1) {
                        str += "node" + counter + " -> book" + current.isbm + books + "\n";
                    } else {
                        str += "book" + current.isbm + (books - 1) + " -> book" + current.isbm + books + "\n";
                    }
                    temp = temp.stack_next;
                    books++;
                }
                current = current.list_next;
                counter++;
            }
        }
        str += '}';
        console.log(str);
        d3.select("#graph3").graphviz().width(1000).height(650).renderDot(str);
    }
}

var pila = new Stack();
pila.push_list(12345678912, "pepe juarez", "principito", 2, "Fantasia");
pila.push_list(987654321123, "juan perez", "libro 1", 7, "Thriller");
pila.push_list(147258369852, "Luis Lopez", "libro 2", 5, "Fantasia");
pila.pop(12345678912);