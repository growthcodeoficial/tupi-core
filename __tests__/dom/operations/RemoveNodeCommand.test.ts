// __tests__/dom/operations/RemoveNodeCommand.test.ts
import RemoveNodeCommand from "@dom/operations/RemoveNodeCommand";
import DOMOperation from "@dom/diffing/DOMOperation";
import { DOMOperationType } from "@dom/diffing/DOMOperation";
import ElementNode from "@dom/virtual-dom/ElementNode";

describe("RemoveNodeCommand", () => {
  let container: ElementNode;
  let command: RemoveNodeCommand;
  let operation: DOMOperation;
  let targetElement: ElementNode;

  beforeEach(() => {
    // Criando o contêiner e o elemento alvo
    targetElement = new ElementNode("span", { id: "target-element" }, []);
    container = new ElementNode("div", {}, [targetElement]);

    // Criando a operação e o comando
    operation = new DOMOperation(DOMOperationType.REMOVE_NODE, targetElement);
    command = new RemoveNodeCommand(operation);
  });

  it("should remove the node from the container", () => {
    // Verificando se o elemento alvo está presente antes da execução
    expect(container.children).toContain(targetElement);

    // Executando o comando
    command.execute(container.render());

    // Verificando se o elemento alvo foi removido
    expect(container.children).not.toContain(targetElement);
  });
});
