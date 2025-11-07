import { Node } from "./Node.js";

export class Tree {
  constructor(arr) {
    const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(arr) {
    //Devuelve el Nodo Raiz
    return this.crearArbol(arr, 0, arr.length - 1);
  }

  //Funcion recursiva para crear un arbol binario de busqueda
  crearArbol(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.left = this.crearArbol(arr, start, mid - 1);
    root.right = this.crearArbol(arr, mid + 1, end);

    return root;
  }

  //Insertar un valor en el arbol
  insert(value, node = this.root) {
    //console.log(node)
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    if (node === null) {
      return new Node(value);
    }

    if (value === node.data) {
      return node;
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  //Eliminar un valor en el arbol
  deleteItem(value) {
    //Hay que tener en cuenta si el elemento a eliminar tiene hijos o no los tiene
  }

  //Buscar y devolver el nodo con el valor dado
  find(value) {}

  //Recorre el arbol por niveles. Se busca que funcione igual que forEach para un array. Alienta a que se resuelva por iteracion y recursion. Si no recibe una callback hay que presentar un error.
  levelOrderForEach(callback) {}

  //Recorrer el arbol segun sea inOrden, preOrden, postOrden
  //Debe funcionar igual que forEach anterior
  inOrderForEach(callback) {}
  preOrderForEach(callback) {}
  postOrderForEach(callback) {}

  //Devuelve la altura (numero de aristas en el camino mas largo desde ese nodo hasta un nodo hoja) y si no se encuentra el nodo en el arbol devuelve null
  height(value) {}

  //Devuelve la profundidad (numero de aristas en el camino desde ese nodo hasta el nodo raíz) y si no se encuentra el nodo en el arbol devuelve null
  depth() {}

  //Verificar que el arbol esta balanceado, aplicar esta formula
  //para cada nodo del arbol, la diferencia de altura entre sus subarboles izq y der no es mayor que 1, y que cada subarboles tambien esten balanceados.
  //Es decir hay que comprobar cada nodo
  isBalanced() {}

  //Escribe una funcion que reequilibre el arbol si no esta balanceado
  rebalance() {}

  //Necesita el nodo raiz
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return null;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
