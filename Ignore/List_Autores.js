class Node_Autores { // data = dpi
    constructor(data, nombre_Autor, correo, telefono, direccion, biografia, next = null, prev = null) {
        this.next = next;
        this.prev = prev;
        this.data = data;
        this.nombre_Autor = nombre_Autor;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.biografia = biografia;
    }
}

class List_Autores {
    constructor() {
        this.head = null;
        this.size = 0;
    }
//usuarios
    insert(data, nombre_Autor, correo, telefono, direccion, biografia) {
        if (!this.head) {
            this.insertFirst(data, nombre_Autor, correo, telefono, direccion, biografia);
        } else {
            this.insertLast(data, nombre_Autor, correo, telefono, direccion, biografia);
        }
    }
    // Insert first node
    insertFirst(data, nombre_Autor, correo, telefono, direccion, biografia) {
        this.head = new Node_Autores(data, nombre_Autor, correo, telefono, direccion, biografia, this.head);
        this.size++;
    }

    // Insert last node
    insertLast(data, nombre_Autor, correo, telefono, direccion, biografia) {
        let node = new Node_Autores(data, nombre_Autor, correo, telefono, direccion, biografia);
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
//insert para libros (pila)

//insert para cola ()


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
            console.log(current.data + " " + current.nombre_Autor + " " + current.correo);
            current = current.next;
            stop = true;
            if (current === this.head && stop === true) {
                break;
            }
        }
    }

    graph() {
        let str = "";
        str = "digraph G{\nlabel=\" Inicio a fin \";\nnode [shape=circle];\n rankdir=LR \n";
        if (this.head) {
            let current = this.head;
            let counter = 0;
            while (current) {
                if (current === this.head && counter != 0) {
                    break;
                }
                str += "node" + counter;
                str += '[label="';
                str += current.data + "\n" + current.nombre_Autor + "\n" + current.correo + "\n" + current.biografia + "\n" + current.telefono;
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
        d3.select("#graph").graphviz().width(500).height(500).renderDot(str);
    }

    login(user, pass){
        if(this.head != null){
            let current = this.head;
            stop = false;
            while(current != null){
                console.log(current.data + " " + current.biografia);
                if(current == this.head && stop === true){
                    console.log("False");
                    return false;
                }
                
                if(current.data == user && current.biografia == pass){
                    console.log("True");
                    return true;
                }
                stop = true;
                current = current.next;
            }
            console.log("False");
            return false;
        }
        return false;
    }
}

var autores = new List_Autores(); // Linked List to hold Autores

//Autores.insert(2354168452525, "Wilfred Perez", "Wilfred", "Wilfred@gmail.com", "Admin", "123", "+502 (123) 123-4567");

function leerJson_Autores(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var json = JSON.parse(this.responseText);
            for(let i = 0; i < json.length; i++){
                //console.log(json[i].dpi + " | " + json[i].nombre_autor + " | " + json[i].correo + " | " + json[i].telefono + " | " + json[i].direccion + " | " + json[i].biografia)
                autores.insert(json[i].dpi, json[i].nombre_autor, json[i].correo, json[i].telefono, json[i].direccion, json[i].biografia);
            }          
        }   
    }
    console.log("GG");
    xhttp.open("GET", "autores.json", true);
    xhttp.send();
    setTimeout(function() {
        autores.graph();
    }, (0.5 * 1000));
}