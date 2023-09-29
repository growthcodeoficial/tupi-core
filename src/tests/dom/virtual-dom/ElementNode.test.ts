// tests/dom/virtual-dom/ElementNode.test.ts

import ElementNode from "@dom/virtual-dom/ElementNode";
import TextNode from "@dom/virtual-dom/TextNode";

test("ElementNode render", () => {
  const textNode = new TextNode("Hello, World!");
  const elementNode = new ElementNode("div", { id: "test" }, [textNode]);
  const rendered = elementNode.render();
  expect(rendered.tagName).toBe("DIV");
  expect(rendered.id).toBe("test");
  expect(rendered.textContent).toBe("Hello, World!");
});
