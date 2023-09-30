// tests/dom/virtual-dom/ElementNode.test.ts

import ElementNode, { Element, Props } from "@dom/virtual-dom/ElementNode";

describe("Node", () => {
  // Teste para garantir que cada nova instância de ElementNode recebe um ID único
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

  // Teste para garantir que a classe é inicializada corretamente com os argumentos fornecidos
  it("should correctly initialize with provided arguments", () => {
    expect(elementNode.type).toEqual(type);
    expect(elementNode.props).toEqual(props);
    expect(elementNode.children).toEqual(children);
  });

  // Teste para garantir que a classe é renderizada em um HTMLElement de forma precisa
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

  // Teste para garantir que os filhos podem ser adicionados corretamente ao nó
  it("should correctly add children", () => {
    elementNode.addChild(child1);
    expect(elementNode.children).toContain(child1);
    expect(elementNode.children.length).toBe(1);

    elementNode.addChild(child2);
    expect(elementNode.children).toContain(child2);
    expect(elementNode.children.length).toBe(2);
  });

  // Teste para garantir que os filhos podem ser removidos corretamente do nó
  it("should correctly remove children", () => {
    elementNode.addChild(child1);
    elementNode.addChild(child2);
    elementNode.removeChild(child1);
    expect(elementNode.children).not.toContain(child1);
    expect(elementNode.children).toContain(child2);
    expect(elementNode.children.length).toBe(1);
  });

  // Teste para lidar com a remoção de um não-filho
  it("should handle removing a non-child", () => {
    const nonChild = new ElementNode("h1", {}, []);
    elementNode.removeChild(nonChild);
    expect(elementNode.children.length).toBe(0);
  });

  // Teste para garantir que os filhos podem ser substituídos corretamente no nó
  it("should correctly replace children", () => {
    elementNode.addChild(child1);
    const newChild = new ElementNode("h1", {}, []);
    elementNode.replaceChild(newChild, child1);
    expect(elementNode.children).toContain(newChild);
    expect(elementNode.children).not.toContain(child1);
    expect(elementNode.children.length).toBe(1);
  });

  // Teste para lidar com a substituição de um não-filho
  it("should handle replacing a non-child", () => {
    const nonChild = new ElementNode("h1", {}, []);
    const newChild = new ElementNode("h2", {}, []);
    elementNode.replaceChild(newChild, nonChild);
    expect(elementNode.children.length).toBe(0);
  });

  // Testes para ElementNode

  // ... (outros testes)

  // Teste para verificar se o setter 'children' está funcionando como esperado
  it("should correctly set children through setter", () => {
    const initialChildren: Element[] = [new ElementNode("span", {}, [])];
    const elementNode = new ElementNode("div", {}, initialChildren);

    // Verifica se os filhos iniciais estão corretos
    expect(elementNode.children).toEqual(initialChildren);

    // Define novos filhos
    const newChildren: Element[] = [
      new ElementNode("span", {}, []),
      new ElementNode("a", {}, []),
    ];
    elementNode.children = newChildren;

    // Verifica se os novos filhos foram atribuídos corretamente
    expect(elementNode.children).toEqual(newChildren);
  });

  // Teste para permitir a modificação de props e children
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

  // Teste para garantir que os listeners de eventos nativos são adicionados corretamente
  it("should correctly add native event listeners", () => {
    const mockListener = jest.fn();
    elementNode.addNativeEventListener("click", mockListener);
    const renderedElement = elementNode.render();
    renderedElement.click();
    expect(mockListener).toHaveBeenCalled();
  });

  // Teste para garantir que os listeners de eventos são aplicados ao elemento renderizado
  it("should apply event listeners to the rendered element", () => {
    const mockListener = jest.fn();
    elementNode.addNativeEventListener("click", mockListener);
    const renderedElement = elementNode.render();
    renderedElement.click();
    expect(mockListener).toHaveBeenCalled();
  });
});
