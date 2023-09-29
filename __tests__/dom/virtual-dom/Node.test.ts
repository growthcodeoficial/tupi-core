// tests/dom/virtual-dom/Node.test.ts

import Node from "@dom/virtual-dom/Node";

class MockNode extends Node {
  render() {
    return document.createTextNode("MockNode");
  }
}

test("MockNode render", () => {
  const node = new MockNode();
  expect(node.render().textContent).toBe("MockNode");
});
