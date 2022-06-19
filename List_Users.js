class Node {
    constructor(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono, next = null, prev = null) {
        this.next = next;
        this.prev = prev;
        this.purchase = null;
        this.data = data;
        this.nombre_Completo = nombre_Completo;
        this.nombre_Usuario = nombre_Usuario;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.role = role;
        this.correo = correo;
    }
}

class Node_Purchases {
    constructor(user, isbn, nombre, autor, purchase = null) {
        this.user = user;
        this.isbm = isbn;
        this.nombre = nombre;
        this.autor = autor;
        this.purchase = purchase;
    }
}

class List_Users {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    //usuarios
    insert(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono) {
        if (!this.head) {
            this.insertFirst(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono);
        } else {
            this.insertLast(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono);
        }
    }
    // Insert first node
    insertFirst(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono) {
        this.head = new Node(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono, this.head);
        this.size++;
    }

    // Insert last node
    insertLast(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono) {
        let node = new Node(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono);
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

    bought(user, isbn, nombre, autor) {
        let current = this.head;
        let node = new Node_Purchases(user, isbn, nombre, autor);
        let stop = false;
        while (current) {
            console.log("---", current.data, user);
            if (current.data === user) {
                if (current.purchase === null) {
                    current.purchase = node;
                } else {
                    let temp = current.purchase;
                    while (temp.purchase != null) {
                        temp = temp.purchase;
                    }
                    temp.purchase = node;
                }
                break;
            }
            stop = true;
            current = current.next;
            if (current === this.head && stop === true) {
                break;
            }
        }
    }

    // Print list data
    printListData() {
        let current = this.head;
        let stop = false;
        while (current) {
            console.log(current.data + " " + current.contrasena);
            current = current.next;
            stop = true;
            if (current === this.head && stop === true) {
                break;
            }
        }
    }

    graph() {
        let str = "";
        str = "digraph G{\nlabel=\" Usuarios \";\nsize=7; \nnode [shape=circle];\n rankdir=LR \n";
        if (this.head) {
            let current = this.head;
            let counter = 0;
            while (current) {
                if (current === this.head && counter != 0) {
                    break;
                }
                str += "node" + counter;
                str += '[label="' + current.data + "\\n" + current.nombre_Completo + "\\n" + current.nombre_Usuario + "\n" + current.contrasena + "\n" + current.telefono + '"];\n';
                if (current === this.fin) {
                    str += "node" + counter + ";\n";
                } else if (current.next) {
                    str += "node" + counter + "-> node" + (counter + 1) + "[dir= \"both\" ];\n";
                }
                current = current.next;
                counter++;
            }
            str += "node" + (counter - 1) + " -> " + "node0" + "[dir= \"both\" constraint=false];\n";
            str += "rank=same;"
        }
        str += '}';
        d3.select("#graph").graphviz().width(1000).height(650).renderDot(str);
    }

    graphBooks() {
        let str = "";
        str = "digraph G{\nlabel=\" Usuarios \";\nsize=7; \nnode [shape=circle];\n rankdir=TB; \n";
        if (this.head) {
            let current = this.head;
            let counter = 0;
            let rowinfo = "rank=same;"
            while (current) {
                if (current === this.head && counter != 0) {
                    break;
                }
                str += "node" + counter;
                rowinfo += "node" + counter + ";";
                str += '[label="' + current.data + "\\n" + current.nombre_Completo + "\\n" + current.nombre_Usuario + "\n" + current.contrasena + "\n" + current.telefono + '"];\n';
                if (current.purchase != null) {
                    let temp = current.purchase;
                    let rand = 2;
                    str += "book" + temp.user + "1" + '[label="' + temp.nombre +'"];\n';
                    str += "node" + counter + " -> book" + temp.user + "1;\n";
                    temp = temp.purchase;
                    while (temp) {
                        str += "book" + temp.user + rand + '[label="' + temp.nombre +'"];\n';
                        //if(temp.purchase != null){
                        str += "book" + temp.user + (rand - 1) + " -> book" + temp.user + rand + ";";
                        //} else {

                        //}
                        rand++;
                        temp = temp.purchase;
                    }
                }
                if (current === this.fin) {
                    str += "node" + counter + ";\n";
                } else if (current.next) {
                    str += "node" + counter + "-> node" + (counter + 1) + "[dir= \"both\" ];\n";
                }
                current = current.next;
                counter++;
            }
            str += "node" + (counter - 1) + " -> " + "node0" + "[dir= \"both\" constraint=false];\n";
            str += "{" + rowinfo + "};\n";
        }
        str += '}';
        //console.log(str);
        d3.select("#graph3").graphviz().width(1000).height(650).renderDot(str);
    }

    login(user, pass) {
        if (this.head != null) {
            let current = this.head;
            stop = false;
            while (current != null) {
                console.log(current.nombre_Usuario + " " + current.contrasena);
                if (current == this.head && stop === true) {
                    console.log("Incorrect information");
                    return false;
                }
                if (current.nombre_Usuario == user && current.contrasena == pass) {
                    console.log("True", current.role);
                    return current;
                }
                stop = true;
                current = current.next;
            }
        }
        console.log("User Not Found");
        return false;
    }
}

var users = new List_Users(); // Linked List to hold users

users.insert(2354168452525, "Wilfred Perez", "Wilfred", "Wilfred@gmail.com", "Administrador", "123", "+502 (123) 123-4567");