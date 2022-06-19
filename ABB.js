class Node_ABB {
    constructor(dpi, nombre_Autor, correo, telefono, direccion, biografia, left = null, right = null) {
        this.dpi = dpi;
        this.nombre_Autor = nombre_Autor;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.biografia = biografia;
        this.left = left;
        this.right = right;
    }
}

class ABB {
    constructor(){
        this.raiz = null;
        this.size = 0;
    }

    insert(dpi, nombre_Autor, correo, telefono, direccion, biografia){
        let node = new Node_ABB(dpi, nombre_Autor, correo, telefono, direccion, biografia);
        if(this.raiz === null){
            this.raiz = node;
        } else {
            let temp = this.raiz;
            let status = false;
            while(temp && status === false){
                if(temp.dpi === dpi){
                    status = true;
                    break;
                }
                if(nombre_Autor > temp.nombre_Autor){
                    if(temp.right === null){
                        temp.right = node;
                        status = true;
                    } else {
                        temp = temp.right;
                    }
                } else if(nombre_Autor < temp.nombre_Autor){
                    if(temp.left === null){
                        temp.left = node;
                        status = true;
                    } else {
                        temp = temp.left;
                    }
                }
            }
            this.size++;
        }
    }

    displayIO(temp = this.raiz, go){
        if(temp === null){
            return;
        }
        this.displayIO(temp.left, go);
        console.log(temp.nombre_Autor + " ");
        this.displayIO(temp.right, go);
    }

    displayPreO(temp = this.raiz, go){
        if(temp === null){
            return;
        }
        console.log(temp.nombre_Autor + " ");
        this.displayPreO(temp.left, go);        
        this.displayPreO(temp.right, go);
    }

    displayPostO(temp = this.raiz, go){
        if(temp === null){
            return;
        }
        this.displayPostO(temp.left, go);        
        this.displayPostO(temp.right, go);
        console.log(temp.nombre_Autor + " ");
    }
    graficadora(temp) { // modify temp.data to temp.dpi and adjust other values
        let cadena = "";
        if(temp === null){
            return cadena;
        }
        cadena = "nodo" + temp.dpi + " [label = \"" + temp.nombre_Autor + "\"]; \n"; // DPI: " + temp.dpi + "\\n 
        
        if (temp.left != null) {//:C0
            cadena = cadena + this.graficadora(temp.left) + "nodo" + temp.dpi + " -> nodo" + temp.left.dpi + "\n";
        }
        if (temp.right != null) {//:C1
            cadena = cadena + this.graficadora(temp.right) + "nodo" + temp.dpi + " -> nodo" + temp.right.dpi + "\n";
        }
        return cadena;
    }

    graph() {
        let str = "";
        str = "digraph G{\nlabel=\" Autores \";\nsize=7; \n";
        if (this.raiz) {
            let current = this.raiz;
            let counter = 0;
            str += this.graficadora(this.raiz);
        }
        str += '}';
        //console.log(str);
        d3.select("#graph").graphviz().width(1000).height(650).renderDot(str);
    }

    
}

var abb = new ABB();