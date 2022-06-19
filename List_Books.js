class Node_Libros {
    constructor(isbm, nombre_Autor, nombre_Libro, cantidad, fila, columna, paginas, categoria, next = null, prev = null) {
        this.next = next;
        this.prev = prev;
        this.isbm = isbm;
        this.nombre_Autor = nombre_Autor;
        this.nombre_Libro = nombre_Libro;
        this.cantidad = cantidad;
        this.fila = fila;
        this.columna = columna;
        this.paginas = paginas;
        this.categoria = categoria;
    }
}

class List_Books {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    // Libros
    insert(isbm, nombre_Autor, nombre_Libro, cantidad, fila, columna, paginas, categoria) {
        if (!this.head) {
            this.insertFirst(isbm, nombre_Autor, nombre_Libro, cantidad, fila, columna, paginas, categoria);
        } else {
            this.insertLast(isbm, nombre_Autor, nombre_Libro, cantidad, fila, columna, paginas, categoria);
        }
    }
    // Insert first node
    insertFirst(isbm, nombre_Autor, nombre_Libro, cantidad, fila, columna, paginas, categoria) {
        this.head = new Node_Libros(isbm, nombre_Autor, nombre_Libro, cantidad, fila, columna, paginas, categoria, this.head);
        this.size++;
    }

    // Insert last node
    insertLast(isbm, nombre_Autor, nombre_Libro, cantidad, fila, columna, paginas, categoria) {
        let node = new Node_Libros(isbm, nombre_Autor, nombre_Libro, cantidad, fila, columna, paginas, categoria);
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
    //Search for a book
    search(isbn){
        let current = this.head;
        while(current){
            console.log("text1");
            if(current.isbm == isbn){
                console.log("text2");
                return current;
            }
            console.log("text3");
            current = current.next;
        }
    }
    // Print List
    printListData() {
        let current = this.head;
        let stop = false;
        while (current) {
            console.log(current.isbm + " " + current.nombre_Autor);
            current = current.next;
            stop = true;
            if (current === this.head && stop === true) {
                break;
            }
        }
    }

    graph() {
        let str = "digraph G{\nlabel=\" Usuarios \";\ngraph[size=\"15,7\"]; \nnode [shape=circle];\n rankdir=LR \n";
        if (this.head) {
            let current = this.head;
            let counter = 0;
            while (current) {
                str += "node" + counter + '[label="' + current.isbm + "\\n" + current.nombre_Autor + "\\n" + current.nombre_Libro + "\\n" + current.cantidad + "\\n" + current.fila + "\\n" + current.columna + "\\n" + current.paginas + "\\n" + current.categoria + "\"];\n";
                if (current === this.fin) {
                    str += "node" + counter + ";\n";
                } else if (current.next) {
                    str += "node" + counter + "-> node" + (counter + 1) + "[dir= \"both\" ];\n";
                }
                current = current.next;
                counter++;
                if (current === this.head && counter != 0) {
                    break;
                }
            }
            str += "node" + (counter - 1) + " -> " + "node0" + "[dir= \"both\" constraint=false];\n";
            str += "rank=same;"
        }
        str += '}';
        console.log(str);
        d3.select("#graph").graphviz().width(1000).height(650).renderDot(str);
    }
}
var libros = new List_Books(); // Linked List to hold book