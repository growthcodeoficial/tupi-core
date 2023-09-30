import DOMOperation, { DOMOperationType } from "@dom/diffing/DOMOperation";
import ElementNode from "@dom/virtual-dom/ElementNode";

describe("DOMOperation", () => {
  // 1. Inicialização correta de todos os tipos de operações
  it("should initialize ADD_NODE correctly", () => {
    const node = new ElementNode("div", {}, []);
    const op = new DOMOperation(DOMOperationType.ADD_NODE, node);
    expect(op.type).toBe(DOMOperationType.ADD_NODE);
    expect(op.targetNode).toBe(node);
    expect(op.content).toBeUndefined();
  });

  it("should initialize REMOVE_NODE correctly", () => {
    const node = new ElementNode("div", {}, []);
    const op = new DOMOperation(DOMOperationType.REMOVE_NODE, node);
    expect(op.type).toBe(DOMOperationType.REMOVE_NODE);
    expect(op.targetNode).toBe(node);
    expect(op.content).toBeUndefined();
  });

  it("should initialize REPLACE_NODE correctly", () => {
    const oldNode = new ElementNode("div", {}, []);
    const newNode = new ElementNode("span", {}, []);
    const op = new DOMOperation(
      DOMOperationType.REPLACE_NODE,
      oldNode,
      newNode
    );
    expect(op.type).toBe(DOMOperationType.REPLACE_NODE);
    expect(op.targetNode).toBe(oldNode);
    expect(op.content).toBe(newNode);
  });

  it("should initialize UPDATE_NODE correctly", () => {
    const node = new ElementNode("div", {}, []);
    const updatedNode = new ElementNode("div", { class: "updated" }, []);
    const op = new DOMOperation(
      DOMOperationType.UPDATE_NODE,
      node,
      updatedNode
    );
    expect(op.type).toBe(DOMOperationType.UPDATE_NODE);
    expect(op.targetNode).toBe(node);
    expect(op.content).toBe(updatedNode);
  });
});
