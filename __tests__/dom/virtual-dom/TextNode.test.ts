// tests/dom/virtual-dom/TextNode.test.ts

import TextNode from "@dom/virtual-dom/TextNode";

describe("TextNode", () => {
  it("should correctly initialize with provided text", () => {
    const text = "Sample Text";
    const textNode = new TextNode(text);

    expect(textNode.text).toEqual(text);
    expect(textNode.type).toEqual("#text");
  });

  it("should render to a Text node", () => {
    const text = "Sample Text";
    const textNode = new TextNode(text);
    const renderedNode = textNode.render();

    expect(renderedNode.nodeType).toEqual(Node.TEXT_NODE);
    expect(renderedNode.nodeValue).toEqual(text);
  });

  it("should update text value", () => {
    const text = "Sample Text";
    const newText = "Updated Text";
    const textNode = new TextNode(text);

    textNode.text = newText;
    expect(textNode.text).toEqual(newText);
  });
});
