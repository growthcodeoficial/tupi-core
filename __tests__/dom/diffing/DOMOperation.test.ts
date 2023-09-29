import DOMOperation, { DOMOperationType } from "@dom/diffing/DOMOperation";
import ElementNode from "@dom/virtual-dom/ElementNode";

describe("DOMOperation", () => {
  it("should initialize correctly", () => {
    const node = new ElementNode("div", {}, []);
    const op = new DOMOperation(DOMOperationType.ADD_NODE, node);
    expect(op.type).toBe(DOMOperationType.ADD_NODE);
    expect(op.targetNode).toBe(node);
    expect(op.content).toBeUndefined();
  });
});
