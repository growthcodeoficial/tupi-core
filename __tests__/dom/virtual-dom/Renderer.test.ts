// tests/dom/virtual-dom/Renderer.test.ts

import Renderer from "@dom/virtual-dom/Renderer";
import TextNode from "@dom/virtual-dom/TextNode";

test("Renderer render", () => {
  const container = document.createElement("div");
  const textNode = new TextNode("Hello, World!");
  Renderer.render(textNode, container);
  expect(container.textContent).toBe("Hello, World!");
});
