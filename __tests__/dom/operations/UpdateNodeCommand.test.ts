// __tests__/dom/operations/UpdateNodeCommand.test.ts
import UpdateNodeCommand from "@dom/operations/UpdateNodeCommand";
import DOMOperation from "@dom/diffing/DOMOperation";
import { DOMOperationType } from "@dom/diffing/DOMOperation";
import ElementNode from "@dom/virtual-dom/ElementNode";

describe("UpdateNodeCommand", () => {
  let container: ElementNode;
  let command: UpdateNodeCommand;
  let operation: DOMOperation;
  let targetNode: ElementNode;
  let updatedContent: ElementNode;

  beforeEach(() => {
    // Criando o contêiner, o nó alvo e o conteúdo atualizado
    targetNode = new ElementNode(
      "div",
      { id: "target-node", value: "old" },
      []
    );
    updatedContent = new ElementNode(
      "div",
      { id: "target-node", value: "new" },
      []
    );
    container = new ElementNode("div", {}, [targetNode]);

    // Criando a operação e o comando
    operation = new DOMOperation(
      DOMOperationType.UPDATE_NODE,
      targetNode,
      updatedContent
    );
    command = new UpdateNodeCommand(operation);
  });

  it("should update the target node properties in the container", () => {
    // Verificando a propriedade 'value' antes da execução
    expect(targetNode.props.value).toBe("old");

    const renderedContainer = container.render(); // Obtendo o contêiner HTML
    command.execute(renderedContainer); // Passando o contêiner HTML para o comando

    // Verificando se a propriedade 'value' foi atualizada
    expect(targetNode.props.value).toBe("new");
  });
});
