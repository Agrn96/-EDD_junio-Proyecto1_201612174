class Node_Top5 {
    constructor(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono, purchases = 0, next = null, prev = null) {
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
        this.purchases = purchases;
    }
}


class List_Top5 {
    constructor() {
        this.head = null;
        this.fin = null;
        this.size = 0;
    }

    check(user) {
        let current = this.head;
        while (current) {
            if (current.data == user) {
                return true;
            }
            current = current.next;
            if (current === this.head) {
                return false;
            }
        }
    }
    //usuarios
    insert(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono) {
        if (this.check(data) === true) {
            return;
        }
        if (!this.head) {
            this.insertFirst(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono);
        } else {
            this.insertLast(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono);
        }
    }
    // Insert first node
    insertFirst(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono) {
        this.head = new Node_Top5(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono, this.head);
        this.size++;
    }

    // Insert last node
    insertLast(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono) {
        let node = new Node_Top5(data, nombre_Completo, nombre_Usuario, correo, role, contrasena, telefono);
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

    increase(user) {
        let current = this.head;
        while (current) {
            if (current.data == user) {
                current.purchases++;
                if (current != this.head) {
                    while (current.purchases > current.prev.purchases) {
                        let node = new Node_Top5(current.data, current.nombre_Completo, current.nombre_Usuario, current.correo, current.role, current.contrasena, current.telefono);
                        let hold = current.purchases;
                        current.data = current.prev.data;
                        current.nombre_Completo = current.prev.nombre_Completo;
                        current.nombre_Usuario = current.prev.nombre_Usuario
                        current.correo = current.prev.correo;
                        current.role = current.prev.role;
                        current.contrasena = current.prev.contrasena;
                        current.telefono = current.prev.telefono;
                        current.purchases = current.prev.purchases;

                        current.prev.data = node.data;
                        current.prev.nombre_Completo = node.nombre_Completo;
                        current.prev.nombre_Usuario = node.nombre_Usuario;
                        current.prev.correo = node.correo;
                        current.prev.role = node.role;
                        current.prev.contrasena = node.contrasena;
                        current.prev.telefono = node.telefono;
                        current.prev.purchases = hold;
                        if(current.prev === this.head){
                            current = current.prev;
                            this.head = current;
                            break;
                        }
                        current = current.prev;
                        
                    }
                }
                break;
            }
            current = current.next;
            if (current === this.head) {
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
        str = "digraph G{\nlabel=\" Top 5 Users \";\ngraph[size=\"10,8\"]; \nnode [shape=circle];\n rankdir=LR \n";
        if (this.head) {
            let current = this.head;
            let counter = 0;
            while (current) {

                str += "node" + counter;
                str += '[label="' + current.nombre_Completo + "\n" + current.purchases + '"];\n';
                if (current === this.fin || counter == 4) {
                    str += "node" + counter + ";\n";
                } else if (current.next) {
                    str += "node" + counter + "-> node" + (counter + 1) + "[dir= \"both\" ];\n";
                }
                current = current.next;
                counter++;
                if (current === this.head || counter == 5) {
                    break;
                }
                
            }
            str += "node" + (counter-1) + " -> " + "node0" + "[dir= \"both\" constraint=false];\n";
            str += "rank=same;"

            
        }
        str += '}';
        //console.log(str);
        d3.select("#graph4").graphviz().width(1000).height(1000).renderDot(str);
    }
}

var top5 = new List_Top5(); // Linked List to hold users
