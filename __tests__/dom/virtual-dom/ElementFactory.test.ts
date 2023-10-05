// tests/dom/virtual-dom/ElementFactory.test.ts

import { ElementFactory } from "@dom/virtual-dom/ElementFactory";
import { ElementTag } from "@dom/virtual-dom/Node";
import TextNode from "@dom/virtual-dom/TextNode";

test("ElementFactory create", () => {
  const textNode = new TextNode("Hello, World!");
  const elementNode = ElementFactory.create("div", { id: "test" }, textNode);
  const rendered = (elementNode as ElementTag).render();
  expect(rendered.tagName).toBe("DIV");
  expect(rendered.id).toBe("test");
  expect(rendered.textContent).toBe("Hello, World!");
});
