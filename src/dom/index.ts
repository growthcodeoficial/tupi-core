// Importações dos submódulos e classes dentro de dom
import ElementNode, { Element, Props } from "@dom/virtual-dom/ElementNode";
import TextNode from "@dom/virtual-dom/TextNode";
import Node from "@dom/virtual-dom/Node";
import DiffingAlgorithm from "@dom/diffing/DiffingAlgorithm";
import DOMDiffResult from "@dom/diffing/DOMDiffResult";
import DOMOperation, { DOMOperationType } from "@dom/diffing/DOMOperation";
import NodeComparator from "@dom/diffing/NodeComparator";

// Exportações
export {
  ElementNode,
  TextNode,
  Node,
  Element,
  Props,
  DiffingAlgorithm,
  DOMDiffResult,
  DOMOperation,
  DOMOperationType,
  NodeComparator,
};
