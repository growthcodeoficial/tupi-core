// tests/dom/virtual-dom/Renderer.test.ts

import Renderer from "@dom/virtual-dom/Renderer";
import TextNode from "@dom/virtual-dom/TextNode";
import ElementNode from "@dom/virtual-dom/ElementNode";
import DOMDiffResult from "@dom/diffing/DOMDiffResult";
import DOMOperation, { DOMOperationType } from "@dom/diffing/DOMOperation";
import DOMQuery from "@dom/virtual-dom/DOMQuery";
import { DOMEEventOperation } from "@dom/operations/event/EventOperationCommand";

describe("Renderer", () => {
  it("should render a TextNode correctly", () => {
    const container = new ElementNode("div");
    const textNode = new TextNode("Hello, World!");
    Renderer.render(textNode, container);
    expect(container.render().textContent).toBe("Hello, World!");
  });

  it("should render an ElementNode correctly", () => {
    const container = new ElementNode("div");
    const elementNode = new ElementNode("span");
    Renderer.render(elementNode, container);
    expect(
      DOMQuery.findChild(
        container,
        (child) => child instanceof ElementNode && child.type === "span"
      )
    ).not.toBeNull();
  });

  it("should correctly handle ADD_EVENT_LISTENER operations", () => {
    const container = new ElementNode("div", { id: "a" }, []);
    const targetNode = new ElementNode("button", { id: "target" }, []);
    container.addChild(targetNode);

    // Criando uma operação fictícia
    const eventOperation: DOMEEventOperation = {
      type: "click",
      listener: jest.fn(),
    };

    const operation = new DOMOperation(
      DOMOperationType.ADD_EVENT_LISTENER,
      targetNode,
      eventOperation
    );

    const diffResult: DOMDiffResult = new DOMDiffResult([operation]);

    Renderer.applyDiff(diffResult, container);

    // Verificando se o listener foi adicionado
    const domElement = targetNode.render();
    domElement.click(); // Simula um clique no elemento DOM
    expect(eventOperation.listener).toHaveBeenCalled();
  });

  it("should throw an error for unsupported operation types", () => {
    const operation = new DOMOperation(
      "UNSUPPORTED_OPERATION_TYPE" as unknown as DOMOperationType,
      new ElementNode("div")
    );
    const diffResult: DOMDiffResult = new DOMDiffResult([operation]);

    expect(() =>
      Renderer.applyDiff(diffResult, new ElementNode("container"))
    ).toThrowError("Unsupported operation type: UNSUPPORTED_OPERATION_TYPE");
  });

  it("should correctly handle REMOVE_EVENT_LISTENER operations", () => {
    const container = new ElementNode("div", { id: "a" }, []);
    const targetNode = new ElementNode("button", { id: "target" }, []);
    container.addChild(targetNode);

    // Adicionando um listener fictício
    const eventOperationAdd: DOMEEventOperation = {
      type: "click",
      listener: jest.fn(),
    };

    let operation = new DOMOperation(
      DOMOperationType.ADD_EVENT_LISTENER,
      targetNode,
      eventOperationAdd
    );

    let diffResult: DOMDiffResult = new DOMDiffResult([operation]);
    Renderer.applyDiff(diffResult, container);

    // Verificando se o listener foi adicionado
    const domElement = targetNode.render();
    domElement.click(); // Simula um clique no elemento DOM
    expect(eventOperationAdd.listener).toHaveBeenCalled();

    // Resetando o mock
    (eventOperationAdd.listener as jest.Mock).mockReset();

    // Removendo o listener fictício
    const eventOperationRemove: DOMEEventOperation = {
      type: "click",
      listener: eventOperationAdd.listener,
    };

    operation = new DOMOperation(
      DOMOperationType.REMOVE_EVENT_LISTENER,
      targetNode,
      eventOperationRemove
    );

    diffResult = new DOMDiffResult([operation]);
    Renderer.applyDiff(diffResult, container);

    // Verificando se o listener foi removido
    domElement.click(); // Simula outro clique no elemento DOM
    expect(eventOperationRemove.listener).not.toHaveBeenCalled();
  });

  it("should correctly handle TRIGGER_EVENT operations", () => {
    const container = new ElementNode("div", { id: "a" });
    const targetNode = new ElementNode("button", { id: "target" });
    container.addChild(targetNode);

    // Adicionando um listener fictício
    const eventOperationAdd: DOMEEventOperation = {
      type: "click",
      listener: jest.fn(),
    };

    let operation = new DOMOperation(
      DOMOperationType.ADD_EVENT_LISTENER,
      targetNode,
      eventOperationAdd
    );

    let diffResult: DOMDiffResult = new DOMDiffResult([operation]);
    Renderer.applyDiff(diffResult, container);

    // Criando uma operação fictícia para disparar o evento
    const eventOperationTrigger: DOMEEventOperation = {
      type: "click",
      listener: jest.fn(),
    };

    operation = new DOMOperation(
      DOMOperationType.TRIGGER_EVENT,
      targetNode,
      eventOperationTrigger
    );

    diffResult = new DOMDiffResult([operation]);
    Renderer.applyDiff(diffResult, container);

    // Verificando se o listener foi chamado quando o evento foi disparado
    expect(eventOperationAdd.listener).toHaveBeenCalled();
  });
});
