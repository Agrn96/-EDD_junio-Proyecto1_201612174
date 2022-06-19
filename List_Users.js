class Node {
    constructor(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono, next = null, prev = null) {
        this.next = next;
        this.prev = prev;
        this.data = data;
        this.nombre_Completo = nombre_Completo;
        this.nombre_Usuario = nombre_Usuario;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.role = role;
        this.correo = correo;
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

    pop() {
        if (this.fin == null) {
            if (this.head == null) {
                console.log("Pila Vacia");
                return;
            } else if (this.head) {
                let temp = this.head.data;
                this.clearList();
                this.size--;
                return temp;
            }
        } else if (this.head.next == this.head) {
            let temp = this.head.data;
            this.head = null;
            this.size = 0;
            return temp;
        } else {
            let temp = this.fin;
            this.fin = this.fin.prev;
            this.fin.next = this.head;
            this.head.prev = this.fin;
            this.size--;
            return temp.data;
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
                str += '[label="';
                str += current.data + "\\n" + current.nombre_Completo + "\\n" + current.nombre_Usuario + "\n" + current.contrasena + "\n" + current.telefono;
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
                current = current.next;
                counter++;
            }
            str += "node" + (counter - 1) + " -> " + "node0" + "[dir= \"both\" constraint=false];\n";
            str += "rank=same;"
        }
        str += '}';
        //console.log(str);
        d3.select("#graph").graphviz().width(1000).height(650).renderDot(str);
    }

    login(user, pass) {
        if (this.head != null) {
            let current = this.head;
            stop = false;
            while (current != null) {
                console.log(current.nombre_Usuario + " " + current.contrasena);
                if (current == this.head && stop === true) {
                    console.log("False1");
                    return false;
                }
                console.log("gggg", current.nombre_Usuario, current.contrasena);
                console.log("hhhh",user,pass);
                if (current.nombre_Usuario == user && current.contrasena == pass) {
                    console.log("True", current.role);
                    return current.role;
                }
                stop = true;
                current = current.next;
            }
            console.log("False2");
            return false;
        }
        return false;
    }
}

var ll = new List_Users();
var users = new List_Users(); // Linked List to hold users

users.insert(2354168452525, "Wilfred Perez", "Wilfred", "Wilfred@gmail.com", "Administrador", "123", "+502 (123) 123-4567");
users.printListData();
function leerJson_Usuarios() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            for (let i = 0; i < json.length; i++) {
                users.insert(json[i].dpi, json[i].nombre_completo, json[i].nombre_usuario, json[i].correo, json[i].rol, json[i].contrasenia, json[i].telefono);
            }
        }
    }

    xhttp.open("GET", "usuarios.json", true);
    xhttp.send();
    setTimeout(function () {
        users.graph();
    }, (5 * 1000));

}
