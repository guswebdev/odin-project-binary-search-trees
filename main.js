import { Tree } from "./Tree.js";

//[1, 3, 5,2]
const arbol = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

arbol.insert(4);

arbol.prettyPrint();
