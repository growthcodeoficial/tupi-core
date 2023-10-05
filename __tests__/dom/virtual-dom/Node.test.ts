// tests/dom/virtual-dom/Node.test.ts
import { Testable } from "./decorators";
import Node from "@dom/virtual-dom/Node";

@Testable
class TestNode extends Node {}

describe("Node", () => {
  let nodeInstance: Node;

  beforeEach(() => {
    nodeInstance = new TestNode();
  });

  it("should generate a unique ID on creation", () => {
    expect(nodeInstance.id).toEqual("_mockedUniqueId");
  });
});
