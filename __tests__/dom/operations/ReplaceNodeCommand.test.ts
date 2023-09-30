// __tests__/dom/operations/ReplaceNodeCommand.test.ts
import ReplaceNodeCommand from "@dom/operations/ReplaceNodeCommand";
import DOMOperation from "@dom/diffing/DOMOperation";
import { DOMOperationType } from "@dom/diffing/DOMOperation";
import ElementNode from "@dom/virtual-dom/ElementNode";
import DOMQuery from "@dom/virtual-dom/DOMQuery";

describe("ReplaceNodeCommand", () => {
  let container: ElementNode;
  let command: ReplaceNodeCommand;
  let operation: DOMOperation;
  let oldElement: ElementNode;
  let newElement: ElementNode;

  beforeEach(() => {
    // Criando o contêiner, o velho elemento e o novo elemento
    oldElement = new ElementNode("div", { id: "old-element" }, []);
    newElement = new ElementNode("div", { id: "new-element" }, []);
    container = new ElementNode("div", {}, [oldElement]);

    // Criando a operação e o comando
    operation = new DOMOperation(
      DOMOperationType.REPLACE_NODE,
      oldElement,
      newElement
    );
    command = new ReplaceNodeCommand(operation);
  });

  it("should replace the old node with the new node in the container", () => {
    // Verificando se o velho elemento está presente e o novo elemento não está presente antes da execução
    expect(
      DOMQuery.findChildById(container, "old-element")
    ).not.toBeUndefined();
    expect(DOMQuery.findChildById(container, "new-element")).toBeUndefined();

    // Executando o comando
    const renderedContainer = document.createElement("div"); // Criando um contêiner HTML
    renderedContainer.appendChild(container.render()); // Anexando o DOM virtual renderizado ao contêiner HTML
    command.execute(renderedContainer); // Passando o contêiner HTML para o comando

    // Verificando se o velho elemento foi substituído pelo novo elemento
    expect(DOMQuery.findChildById(container, "old-element")).toBeUndefined();
    expect(
      DOMQuery.findChildById(container, "new-element")
    ).not.toBeUndefined();
  });
});
