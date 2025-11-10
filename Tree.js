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

  // Encontrar en numero minimo para reemplazar
  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Eliminar un nodo
  deleteItem(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const successor = this.findMin(node.right);
      node.data = successor.data;
      node.right = this.deleteItem(successor.data, node.right);
    }

    return node;
  }

  //Buscar y devolver el nodo con el valor dado
  find(value, node = this.root) {
    if (node === null) {
      return null;
    }
    if (node.data === value) {
      return node;
    }

    const left = this.find(value, node.left);
    const right = this.find(value, node.right);

    return left || right;
  }

  //Recorre el arbol por niveles. Se busca que funcione igual que forEach para un array. Alienta a que se resuelva por iteracion y recursion. Si no recibe una callback hay que presentar un error.
  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Tienes que pasar una callback.");
    }

    if (this.root === null) return;

    const cola = [this.root];

    while (cola.length > 0) {
      const node = cola.shift();

      callback(node);

      if (node.left !== null) {
        cola.push(node.left);
      }
      if (node.right !== null) {
        cola.push(node.right);
      }
    }
  }

  //Recorrer el arbol segun sea inOrden, preOrden, postOrden
  //Debe funcionar igual que forEach anterior
  inOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("Tienes que pasar una callback.");
    }

    if (node === null) return;

    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }
  preOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("Tienes que pasar una callback.");
    }

    if (node === null) return;

    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }
  postOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("Tienes que pasar una callback.");
    }

    if (node === null) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  //Devuelve la altura (numero de aristas en el camino mas largo desde ese nodo hasta un nodo hoja) y si no se encuentra el nodo en el arbol devuelve null
  height(value) {
    const node = this.find(value);
    if (node === null) return null;

    return this.calcularHeight(node);
  }

  calcularHeight(node) {
    if (node === null) {
      return -1;
    }

    const alturaIzquierda = this.calcularHeight(node.left);
    const alturaDerecha = this.calcularHeight(node.right);

    return Math.max(alturaIzquierda, alturaDerecha) + 1;
  }
  //Devuelve la profundidad (numero de aristas en el camino desde ese nodo hasta el nodo raíz) y si no se encuentra el nodo en el arbol devuelve null
  depth(value) {
    return this.calcularDepth(value, this.root, 0);
  }

  calcularDepth(value, node, currDepth) {
    if (node === null) return null;
    if (node.data === value) return currDepth;

    if (value < node.data) {
      return this.calcularDepth(value, node.left, currDepth + 1);
    } else {
      return this.calcularDepth(value, node.right, currDepth + 1);
    }
  }

  //Verificar que el arbol esta balanceado, aplicar esta formula
  //para cada nodo del arbol, la diferencia de altura entre sus subarboles izq y der no es mayor que 1, y que cada subarboles tambien esten balanceados.
  //Es decir hay que comprobar cada nodo
  isBalanced(node = this.root) {
    if (node === null) return true;

    const heightLeft = this.calcularHeight(node.left);
    const heightRight = this.calcularHeight(node.right);

    const balanceo = Math.abs(heightLeft - heightRight);

    if (
      balanceo <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    ) {
      return true;
    } else {
      return false;
    }
  }

  //Escribe una funcion que reequilibre el arbol si no esta balanceado
  rebalance() {
    const valores = [];

    this.inOrderForEach((node) => {
      valores.push(node.data);
    });

    this.root = this.buildTree(valores);
  }

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
