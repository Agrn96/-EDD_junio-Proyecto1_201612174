class Node_MD_Inner {
    constructor(row_No = -1, col_No = -1, data) {
        //Nodes inside Matrix
        this.right = null;
        this.left = null;
        this.up = null;
        this.down = null;
        this.row_No = row_No;
        this.col_No = col_No;
        this.data = data;
    }
}

class Node_MD_Header {
    constructor(id) {
        //Header Nodes
        this.col = null;
        this.row = null;
        this.node_Access = null;
        this.id = id;
    }
}

class MD {
    constructor() {
        this.col_Max = -1;
        this.row_Max = -1;
        this.inicio = null;
    }

    add_Head(newNode) {
        let node = new Node_MD_Header(newNode.data);
        //console.log("RRR " + newNode.data);
        this.inicio = node;
        //console.log("RRR " + this.inicio.id);
    }

    add_Header_Row(x) {
        let temp = this.inicio;
        if (this.inicio.row === null) {
            while (x > this.row_Max) {
                ++this.row_Max;
                let newNode = new Node_MD_Header(this.row_Max);
                temp.row = newNode;
                temp = temp.row;
            }
            return;
        }
        while (temp.row != null) {
            temp = temp.row;
        }
        while (x > this.row_Max) {
            ++this.row_Max;
            let newNode = new Node_MD_Header(this.row_Max);
            temp.row = newNode;
            temp = temp.row;
        }
    }

    add_Header_Col(y) {
        let temp = this.inicio;
        if (this.inicio.col === null) {
            while (y > this.col_Max) {
                ++this.col_Max;
                let newNode = new Node_MD_Header(this.col_Max);
                temp.col = newNode;
                temp = temp.col;
            }
            return;
        }
        while (temp.col != null) {
            temp = temp.col;
        }
        while (y > this.col_Max) {
            ++this.col_Max;
            let newNode = new Node_MD_Header(this.col_Max);
            temp.col = newNode;
            temp = temp.col;
        }
    }

    add_Col_Pointers(newNode) {
        let temp = this.inicio.col;
        let temp_;
        while (temp.id != newNode.col_No) {
            temp = temp.col;
        }

        if (temp.node_Access == null) {
            temp.node_Access = newNode;
        } else if (temp.node_Access.row_No > newNode.row_No) {
            newNode.down = temp.node_Access;
            temp.node_Access.up = newNode;
            temp.node_Access = newNode;
        } else {
            temp_ = temp.node_Access;
            while (temp_) {
                if (temp_.row_No === newNode.row_No) {
                    return;
                } else if (temp_.down === null) {
                    temp_.down = newNode;
                    newNode.up = temp_;
                    break;
                } else if (temp_.down.row_No > newNode.row_No) {
                    temp_.down.up = newNode;
                    newNode.up = temp_;
                    newNode.down = temp_.down;
                    temp_.down = newNode;
                }
                temp_ = temp_.down;
            }
        }
    }

    add_Row_Pointers(newNode) {
        let temp = this.inicio.row;
        while (temp.id != newNode.row_No) {
            temp = temp.row;
        }
        if (temp.node_Access == null) {
            temp.node_Access = newNode;
        } else if (temp.node_Access.col_No > newNode.col_No) {
            newNode.right = temp.node_Access;
            temp.node_Access.left = newNode;
            temp.node_Access = newNode;
        } else {
            let temp_ = temp.node_Access;
            while (temp_) {
                if (temp_.col_No === newNode.col_No) {
                    return;
                } else if (temp_.right === null) {
                    temp_.right = newNode;
                    newNode.left = temp_;
                    break;
                } else if (temp_.right.col_No > newNode.col_No) {
                    temp_.right.left = newNode;
                    newNode.left = temp_;
                    newNode.right = temp_.right;
                    temp_.right = newNode;
                }
                temp_ = temp_.right;
            }
        }
    }

    add_Node(x = 0, y = 0, data) {
        let newNode = new Node_MD_Inner(x, y, data);
        if (this.inicio === null) {
            this.add_Head(newNode);
            //console.log("Testing if it is working: " + data);
            return;
        }
        if (newNode.row_No > this.row_Max) {
            this.add_Header_Row(newNode.row_No);
        }
        if (newNode.col_No > this.col_Max) {
            this.add_Header_Col(newNode.col_No);
        }
        this.add_Col_Pointers(newNode);
        this.add_Row_Pointers(newNode);
    }

    display() {
        let temp = this.inicio;
        console.log("X" + this.inicio.id);
        let temp_ = temp.col;

        console.log(temp.data + " ");
        while (temp_ != null) {
            console.log(temp_.id + " ");
            temp_ = temp_.col;
        }

        temp = this.inicio.row; //Setting to the 1st row
        console.log("");//Setting to the row nodes
        while (temp != null) {
            temp_ = temp.node_Access;
            console.log(temp.id + " ");
            while (temp_ != null) {
                console.log(temp_.data + " ");
                temp_ = temp_.right;
            }
            console.log(" ");
            temp = temp.row;
        }
    }

    display2() {
        let temp = this.inicio;
        console.log("X" + this.inicio.id);
        let temp_ = temp.row;
        //Print headers
        console.log(temp.data + " ");
        while (temp_ != null) {
            console.log(temp_.id + " ");
            temp_ = temp_.row;
        }
        temp = this.inicio.col; //Setting to the 1st row
        console.log("");//Setting to the row nodes
        while (temp != null) {
            temp_ = temp.node_Access;
            console.log(temp.id + " ");
            while (temp_ != null) {
                console.log(temp_.data + " ");
                temp_ = temp_.down;
            }
            console.log("");
            temp = temp.col;
        }
    }

    graficadora1() { // MD With all the rows and cols -- MODIFY
        let cadena;
        let rowInfo = "MD;";
        cadena = "MD -> ";
        for (let i = 0; i <= this.row_Max; i++) {
            if (i === this.row_Max) {
                cadena += "a" + (i) + "\n";
            } else {
                cadena += "a" + (i) + " -> ";
            }
        }
        cadena += "MD -> ";
        for (let i = 0; i <= this.col_Max; i++) {
            if (i === this.col_Max) {
                cadena += "b" + (i) + "\n";
            } else {
                cadena += "b" + (i) + " -> ";
            }
            rowInfo += "b" + (i) + ";";
        }
        cadena += "{rank=same;" + rowInfo + "}\n";
        let temp = this.inicio.row;
        while (temp != null) {
            if (temp.node_Access === null) {
                temp = temp.row;
                continue;
            }
            let rowInfo = "";
            rowInfo += "a" + temp.id + ";";
            let temp_ = temp.node_Access;
            if (temp.node_Access === null) {
                temp = temp.row;
                continue;
            } else {
                cadena += "x" + temp_.row_No + "y" + temp_.col_No + "[label = \"" + temp_.data + "\"]" + "\n";
                cadena += "a" + temp_.row_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> a" + temp_.row_No + "[constraint=false]\n";
                rowInfo += "x" + temp_.row_No + "y" + temp_.col_No + ";"; //data -> color
                if (temp_.up == null) {
                    console.log(temp_.data);
                    cadena += "b" + temp_.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> b" + temp_.col_No + "\n";
                } else {
                    cadena += "x" + temp_.up.row_No + "y" + temp_.up.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> x" + temp_.up.row_No + "y" + temp_.up.col_No + "\n";
                }
                temp_ = temp_.right;
            }
            while (temp_ != null) {
                cadena += "x" + temp_.row_No + "y" + temp_.col_No + "[label = \"" + temp_.data + "\"]" + "\n";
                cadena += "x" + temp_.left.row_No + "y" + temp_.left.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> x" + temp_.left.row_No + "y" + temp_.left.col_No + "[constraint=false]\n";
                rowInfo += "x" + temp_.row_No + "y" + temp_.col_No + ";";
                if (temp_.up == null) {
                    cadena += "b" + temp_.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> b" + temp_.col_No + "\n";
                } else {
                    cadena += "x" + temp_.up.row_No + "y" + temp_.up.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> x" + temp_.up.row_No + "y" + temp_.up.col_No + "\n";
                }
                temp_ = temp_.right;
            }
            temp = temp.row;
            cadena += "\n{rank=same;" + rowInfo + "}\n";
        }
        return cadena;
    }

    graficadora2() { // MD excluding the rows and cols without cells --MODIFY
        let cadena;
        let rowInfo = "MD;";
        cadena = "MD";
        let temp = this.inicio.row;
        for (let i = 0; i <= this.row_Max; i++) {
            if (temp.node_Access != null) {
                cadena += " -> a" + (i);
            }
            temp = temp.row;
        }

        cadena += "\nMD";
        temp = this.inicio.col;
        for (let i = 0; i <= this.col_Max; i++) {
            if (temp.node_Access != null) {
                cadena += " -> b" + (i);
                rowInfo += "b" + (i) + ";";
            }
            temp = temp.col;

        }
        cadena += "{rank=same;" + rowInfo + "}\n";
        temp = this.inicio.row;
        while (temp != null) {
            if (temp.node_Access === null) {
                temp = temp.row;
                continue;
            }
            let rowInfo = "";
            rowInfo += "a" + temp.id + ";";
            let temp_ = temp.node_Access;
            if (temp.node_Access === null) {
                temp = temp.row;
                continue;
            } else {
                cadena += "x" + temp_.row_No + "y" + temp_.col_No + "[label = \"" + temp_.data + "\"]" + "\n";
                cadena += "a" + temp_.row_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> a" + temp_.row_No + "[constraint=false]\n";
                rowInfo += "x" + temp_.row_No + "y" + temp_.col_No + ";"; //data -> color
                if (temp_.up == null) {
                    console.log(temp_.data);
                    cadena += "b" + temp_.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> b" + temp_.col_No + "\n";
                } else {
                    cadena += "x" + temp_.up.row_No + "y" + temp_.up.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> x" + temp_.up.row_No + "y" + temp_.up.col_No + "\n";
                }
                temp_ = temp_.right;
            }
            while (temp_ != null) {
                cadena += "x" + temp_.row_No + "y" + temp_.col_No + "[label = \"" + temp_.data + "\"]" + "\n";
                cadena += "x" + temp_.left.row_No + "y" + temp_.left.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> x" + temp_.left.row_No + "y" + temp_.left.col_No + "[constraint=false]\n";
                rowInfo += "x" + temp_.row_No + "y" + temp_.col_No + ";";
                if (temp_.up == null) {
                    cadena += "b" + temp_.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> b" + temp_.col_No + "\n";
                } else {
                    cadena += "x" + temp_.up.row_No + "y" + temp_.up.col_No + " -> x" + temp_.row_No + "y" + temp_.col_No + " -> x" + temp_.up.row_No + "y" + temp_.up.col_No + "\n";
                }
                temp_ = temp_.right;
            }
            temp = temp.row;
            cadena += "\n{rank=same;" + rowInfo + "}\n";
        }
        return cadena;
    }

    graficadora3() { // MD With all the rows and cols FIXED FOR 1-1
        let cadena;
        let rowInfo = "MD;";
        cadena = "edge[dir = \"both\"];\nMD -> ";
        for (let i = 1; i <= 25; i++) {
            if (i === 25) {
                cadena += "a" + (i) + "\n";
            } else {
                cadena += "a" + (i) + " -> ";
            }
        }
        cadena += "MD -> ";
        for (let i = 1; i <= 25; i++) {
            if (i === 25) {
                cadena += "b" + (i) + "\n";
            } else {
                cadena += "b" + (i) + " -> ";
            }
            rowInfo += "b" + (i) + ";";
        }
        cadena += "{rank=same;" + rowInfo + "}\n";
        //let temp = this.inicio.row;
        for (let j = 1; j <= 25; j++) {
            let rowInfo = "";
            rowInfo += "a" + j + ";";
            //let temp_ = temp.node_Access;
            for (let i = 1; i <= 25; i++) {
                cadena += "  x" + j + "y" + i + "[label = \" \"]" + "\n";;
            }
            cadena += "a" + j + " -> x" + j + "y" + 1;
            rowInfo += "x" + j + "y" + 1 + ";";
            for (let i = 2; i <= 25; i++) {
                cadena += " -> x" + j + "y" + i;
                rowInfo += "x" + j + "y" + i + ";";
            }
            cadena += "\n";
            cadena += "\n{rank=same;" + rowInfo + "}\n";
        }

        for (let j = 1; j <= 25; j++) {
            cadena += "\nb" + j + " -> x" + 1 + "y" + j;
            rowInfo += "x" + 1 + "y" + j + ";";
            for (let i = 2; i <= 25; i++) {
                cadena += " -> x" + i + "y" + j;
            }
        }
        cadena += "\n";
        let temp = this.inicio.row;
        while (temp != null) {
            let temp_ = temp.node_Access;
            while (temp_ != null) {
                if (temp_.row_No > 25 || temp.col_No > 25) {
                    break;
                }
                cadena += "x" + temp_.row_No + "y" + temp_.col_No + "[label = \"" + temp_.data + "\"]" + "\n";
                temp_ = temp_.right;
            }
            temp = temp.row;
        }
        return cadena;
    }

    graph(path) {
        let str = "";
        str = "digraph G{\nlabel=\" MD \";\nsize=7; \nnode [shape=rectangle]; \n";
        if (this.inicio) {
            str += " ";
            str += this.graficadora2(this.raiz);
        }
        str += '}';
        d3.select(path).graphviz().width(1000).height(650).renderDot(str);
    }

    graph(path) {
        let str = "";
        str = "digraph G{\nlabel=\" MD \";\nsize=7; \nnode [shape=rectangle]; \n";
        if (this.inicio) {
            str += " ";
            str += this.graficadora2(this.raiz);
        }
        str += '}';
        d3.select(path).graphviz().width(1000).height(650).renderDot(str);
    }
    graph2(path) {
        let str = "";
        str = "digraph G{\nlabel=\" MD \";\ngraph[bgcolor=\"transparent\"];\nsize=7; \nnode [shape=rectangle]; \n";
        if (this.inicio) {
            str += " ";
            str += this.graficadora2(this.raiz);
        }
        str += '}';
        d3.select(path).graphviz().width(1000).height(650).renderDot(str);
    }

    graph_O(path) {
        let str = "";
        str = "digraph G{\nlabel=\" MD \";\nsize=7; \nnode [shape=rectangle]; \n";
        if (this.inicio) {
            str += " ";
            str += this.graficadora3(this.raiz);
        }
        str += '}';
        d3.select(path).graphviz().width(1000).height(650).renderDot(str);
    }
    graph2_O(path) {
        let str = "";
        str = "digraph G{\nlabel=\" MD \";\ngraph[bgcolor=transparent];\nsize=7; \nnode [shape=rectangle]; \n";
        if (this.inicio) {
            str += " ";
            str += this.graficadora3(this.raiz);
        }
        str += '}';
        d3.select(path).graphviz().width(1000).height(650).renderDot(str);
    }
}

var mD = new MD();
var mO = new MD();

mD.add_Node("MD JS");
mD.add_Node(1, 1, 1672010107384);
mD.add_Node(1, 2, 7813208731085);
mD.add_Node(2, 1, 5926841674782);