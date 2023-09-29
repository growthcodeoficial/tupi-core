import { DOMOperationType } from "@dom/diffing/DOMOperation";
import DiffingAlgorithm from "@dom/diffing/DiffingAlgorithm";
import NodeComparator from "@dom/diffing/NodeComparator";
import ElementNode from "@dom/virtual-dom/ElementNode";

describe("DiffingAlgorithm", () => {
  const comparator = new NodeComparator();
  const algorithm = new DiffingAlgorithm(comparator);

  it("should correctly diff two nodes", () => {
    const oldNode = new ElementNode("div", {}, []);
    const newNode = new ElementNode("span", {}, []);
    const result = algorithm.diff(oldNode, newNode);
    expect(result.operations.length).toBe(1);
    expect(result.operations[0].type).toBe(DOMOperationType.REPLACE_NODE);
    expect(result.operations[0].targetNode).toBe(oldNode);
    expect(result.operations[0].content).toBe(newNode);
  });
});
