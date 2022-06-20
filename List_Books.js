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
        this.fin = null;
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
    search(isbn) {
        let current = this.head;
        while (current) {
            if (current.isbm == isbn) {
                return current;
            }
            current = current.next;
            if (current === this.head) {
                break;
            }
        }
    }

    search2(isbn) {
        let current = this.head;
        while (current) {
            if (current.isbm == isbn) {
                current.cantidad--;
                break;
            }
            current = current.next;
            if (current === this.head) {
                break;
            }
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

    graph(path) {
        let str = "digraph G{\nlabel=\" Libros \";\ngraph[size=\"10,8\"]; \nnode [shape=circle];\n rankdir=LR \n";
        if (this.head) {
            let current = this.head;
            let counter = 0;
            while (current) {
                str += "node" + counter + '[label="' + current.isbm + "\\n" + current.nombre_Autor + "\\n" + current.nombre_Libro + "\\n" + current.cantidad + "\\n" + current.fila + "\\n" + current.columna + "\\n" + current.paginas + "\\n" + current.categoria + "\"];\n";
                if (current === this.fin) {
                    str += "node" + counter + ";\n";
                } else if (current.next) {
                    str += "node" + counter + "-> node" + (counter + 1) + ";\n";
                }
                current = current.next;
                counter++;
                if (current === this.head && counter != 0) {
                    break;
                }
            }
            str += "node" + (counter - 1) + " -> " + "node0" + "[dir= \"backward\" constraint=false];\n";
            str += "rank=same;"
        }
        str += '}';
        //console.log(str);
        d3.select(path).graphviz().width(1000).height(1000).renderDot(str);
    }

    graph2(path) {
        let str = "digraph G{\nlabel=\" Libros \";\ngraph[size=\"10,8\"]; \nnode [shape=circle];\n rankdir=RL \n";
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
        //console.log(str);
        d3.select(path).graphviz().width(1000).height(1000).renderDot(str);
    }

    lastNode(node) {
        while (node.next != null)
            node = node.next;
        return null;
    }

    part(l, h) {
        let x = h.data;
        let i = l.prev;
        for (let j = l; j != h; j = j.next) {
            if (j.data <= x) {
                i = (i == null) ? l : i.next;
                let temp = i.data;
                i.data = j.data;
                j.data = temp;
            }
        }
        i = (i == null) ? l : i.next;
        let temp = i.data;
        i.data = h.data;
        h.data = temp;
        return i;
    }

    _quickSort(l, h) {
        if (h != null && l != h && l != h.next) {
            let temp = partition(l, h);
            _quickSort(l, temp.prev);
            _quickSort(temp.next, h);
        } else {
            return;
        }
    }

    BBS() { //ascend

        let stop = false;
        while (stop === false) {
            stop = true;
            let current = this.head;
            while (current) {
                if (current.isbm > current.next.isbm) {
                    let node = new Node_Libros(current.isbm, current.nombre_Autor, current.nombre_Libro, current.cantidad, current.fila, current.columna, current.paginas, current.categoria);
                    current.isbm = current.next.isbm;
                    current.nombre_Autor = current.next.nombre_Autor;
                    current.nombre_Libro = current.next.nombre_Libro;
                    current.cantidad = current.next.cantidad;
                    current.fila = current.next.fila;
                    current.columna = current.next.columna;
                    current.paginas = current.next.paginas;
                    current.categoria = current.next.categoria;

                    current.next.isbm = node.isbm;
                    current.next.nombre_Autor = node.nombre_Autor;
                    current.next.nombre_Libro = node.nombre_Libro;
                    current.next.cantidad = node.cantidad;
                    current.next.fila = node.fila;
                    current.next.columna = node.columna;
                    current.next.paginas = node.paginas;
                    current.next.categoria = node.categoria;
                    stop = false;
                }
                current = current.next;

                if (current === this.fin) {
                    break;
                }
            } 
        }
        this.graph("#autores");
    }

    QS() { //descend
        let node = this.head;
        let head = lastNode(node);
        _quickSort(node, head);
        this.graph2("#autores");
    }
}
var libros = new List_Books(); // Linked List to hold book