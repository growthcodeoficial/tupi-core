import DiffingAlgorithm from "@dom/diffing/DiffingAlgorithm";
import NodeComparator from "@dom/diffing/NodeComparator";
import ElementNode from "@dom/virtual-dom/ElementNode";
import { DOMOperationType } from "@dom/diffing/DOMOperation";

describe("DiffingAlgorithm", () => {
  const comparator = new NodeComparator();
  const algorithm = new DiffingAlgorithm(comparator);

  // 1. Nós pais são diferentes
  it("should push a REPLACE_NODE operation when parent nodes are different", () => {
    const oldNode = new ElementNode("div");
    const newNode = new ElementNode("span");
    const result = algorithm.diff(oldNode, newNode);
    expect(result.operations.length).toBe(1);
    expect(result.operations[0].type).toBe(DOMOperationType.REPLACE_NODE);
  });

  // 2. Nós pais são iguais, mas têm um número diferente de filhos
  it("should push ADD_NODE or REMOVE_NODE operations for extra children", () => {
    const oldNode = new ElementNode("div", {}, [
      new ElementNode("span"),
    ]);
    const newNode = new ElementNode("div", {}, [
      new ElementNode("span"),
      new ElementNode("a"),
    ]);
    const result = algorithm.diff(oldNode, newNode);
    expect(result.operations.length).toBe(1);
    expect(result.operations[0].type).toBe(DOMOperationType.ADD_NODE);
  });

  // 3. Nós pais são iguais e têm o mesmo número de filhos, mas os filhos são diferentes
  it("should push REPLACE_NODE operations for differing children", () => {
    const oldNode = new ElementNode("div", {}, [
      new ElementNode("span"),
    ]);
    const newNode = new ElementNode("div", {}, [new ElementNode("a")]);
    const result = algorithm.diff(oldNode, newNode);
    expect(result.operations.length).toBe(1);
    expect(result.operations[0].type).toBe(DOMOperationType.REPLACE_NODE);
  });

  // 4. O nó antigo tem mais filhos do que o novo nó.
  it("should push REMOVE_NODE operations when oldNode has more children than newNode", () => {
    const oldNode = new ElementNode("div", {}, [
      new ElementNode("span"),
      new ElementNode("a"),
    ]);
    const newNode = new ElementNode("div", {}, [
      new ElementNode("span"),
    ]);
    const result = algorithm.diff(oldNode, newNode);
    expect(result.operations.length).toBe(1);
    expect(result.operations[0].type).toBe(DOMOperationType.REMOVE_NODE);
  });
});
