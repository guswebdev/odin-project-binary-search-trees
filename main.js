import { Tree } from "./Tree.js";

function generarRandomArray(size, max) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * max));
  }
  return array;
}

const arbol = new Tree(generarRandomArray(25, 100));

console.log(
  `El arbol esta ${arbol.isBalanced() ? "Balanceado" : "Desbalanceado"}`
);

const levelOrderValues = [];
arbol.levelOrderForEach((node) => levelOrderValues.push(node.data));
console.log(`Por Niveles ---> ${levelOrderValues.join(", ")}`);

const preOrderValues = [];
arbol.preOrderForEach((node) => preOrderValues.push(node.data));
console.log(`PreOrden    ---> ${preOrderValues.join(", ")}`);

const inOrderValues = [];
arbol.inOrderForEach((node) => inOrderValues.push(node.data));
console.log(`InOrden     ---> ${inOrderValues.join(", ")}`);

const postOrderValues = [];
arbol.postOrderForEach((node) => postOrderValues.push(node.data));
console.log(`PostOrden   ---> ${postOrderValues.join(", ")}`);

arbol.prettyPrint();

const numerosDesbalancear = [101, 150, 200, 250, 300, 350, 400];
numerosDesbalancear.forEach((num) => arbol.insert(num));

console.log(
  `El arbol esta ${arbol.isBalanced() ? "Balanceado" : "Desbalanceado"}`
);
arbol.prettyPrint();

arbol.rebalance();

console.log(
    `El arbol esta ${arbol.isBalanced() ? "Balanceado" : "Desbalanceado"}`
);

const levelOrderValuesReb = [];
arbol.levelOrderForEach((node) => levelOrderValuesReb.push(node.data));
console.log(`Por Niveles ---> ${levelOrderValuesReb.join(", ")}`);

const preOrderValuesReb = [];
arbol.preOrderForEach((node) => preOrderValuesReb.push(node.data));
console.log(`PreOrden    ---> ${preOrderValuesReb.join(", ")}`);

const inOrderValuesReb = [];
arbol.inOrderForEach((node) => inOrderValuesReb.push(node.data));
console.log(`InOrden     ---> ${inOrderValuesReb.join(", ")}`);

const postOrderValuesReb = [];
arbol.postOrderForEach((node) => postOrderValuesReb.push(node.data));
console.log(`PostOrden   ---> ${postOrderValuesReb.join(", ")}`);

arbol.prettyPrint();