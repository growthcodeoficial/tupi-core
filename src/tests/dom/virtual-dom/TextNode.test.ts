// tests/dom/virtual-dom/TextNode.test.ts

import TextNode from "@dom/virtual-dom/TextNode";

test("TextNode render", () => {
  const textNode = new TextNode("Hello, World!");
  expect(textNode.render().textContent).toBe("Hello, World!");
});
