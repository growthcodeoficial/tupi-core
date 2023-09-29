// tests/dom/virtual-dom/ElementNode.test.ts

import ElementNode, { Element, Props } from "@dom/virtual-dom/ElementNode";

describe("Node", () => {
  it("should generate a unique ID on creation", () => {
    const node1 = new ElementNode("div", {}, []);
    const node2 = new ElementNode("div", {}, []);
    expect(node1.id).not.toEqual(node2.id);
  });
});

describe("ElementNode", () => {
  let elementNode: ElementNode;
  const type = "div";
  const props: Props = { class: "example" };
  const children: Element[] = [];
  const child1 = new ElementNode("span", {}, []);
  const child2 = new ElementNode("p", {}, []);

  beforeEach(() => {
    elementNode = new ElementNode(type, props, []);
  });

  it("should correctly initialize with provided arguments", () => {
    expect(elementNode.type).toEqual(type);
    expect(elementNode.props).toEqual(props);
    expect(elementNode.children).toEqual(children);
  });

  it("should render to an HTMLElement", () => {
    const children: Element[] = [
      new ElementNode("span", { class: "child" }, []),
    ];

    const elementNode = new ElementNode(type, props, children);
    const renderedElement = elementNode.render();

    expect(renderedElement.tagName.toLowerCase()).toEqual(type);
    expect(renderedElement.getAttribute("class")).toEqual(props.class);
    expect(renderedElement.childNodes.length).toEqual(children.length);
    expect(
      (renderedElement.childNodes[0] as HTMLElement).tagName.toLowerCase()
    ).toEqual(children[0].type);
  });

  it("should correctly add children", () => {
    elementNode.addChild(child1);
    expect(elementNode.children).toContain(child1);
    expect(elementNode.children.length).toBe(1);

    elementNode.addChild(child2);
    expect(elementNode.children).toContain(child2);
    expect(elementNode.children.length).toBe(2);
  });

  it("should correctly remove children", () => {
    elementNode.addChild(child1);
    elementNode.addChild(child2);
    elementNode.removeChild(child1);
    expect(elementNode.children).not.toContain(child1);
    expect(elementNode.children).toContain(child2);
    expect(elementNode.children.length).toBe(1);
  });

  it("should handle removing a non-child", () => {
    const nonChild = new ElementNode("h1", {}, []);
    elementNode.removeChild(nonChild);
    expect(elementNode.children.length).toBe(0);
  });

  it("should correctly replace children", () => {
    elementNode.addChild(child1);
    const newChild = new ElementNode("h1", {}, []);
    elementNode.replaceChild(newChild, child1);
    expect(elementNode.children).toContain(newChild);
    expect(elementNode.children).not.toContain(child1);
    expect(elementNode.children.length).toBe(1);
  });

  it("should handle replacing a non-child", () => {
    const nonChild = new ElementNode("h1", {}, []);
    const newChild = new ElementNode("h2", {}, []);
    elementNode.replaceChild(newChild, nonChild);
    expect(elementNode.children.length).toBe(0);
  });

  it("should allow modifying props and children", () => {
    const elementNode = new ElementNode("div", { class: "example" }, []);
    expect(elementNode.props.class).toEqual("example");

    elementNode.props = { class: "updated" };
    expect(elementNode.props.class).toEqual("updated");

    const child = new ElementNode("span", {}, []);
    elementNode.addChild(child);
    expect(elementNode.children).toContain(child);

    elementNode.removeChild(child);
    expect(elementNode.children).not.toContain(child);

    const newChild = new ElementNode("p", {}, []);
    elementNode.replaceChild(newChild, child); // O filho antigo não é encontrado, então nada muda
    expect(elementNode.children).not.toContain(newChild); // Agora espera que newChild não esteja presente
    expect(elementNode.children).not.toContain(child);
  });
});
