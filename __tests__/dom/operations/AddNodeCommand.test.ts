// __tests__/dom/operations/AddNodeCommand.test.ts
import AddNodeCommand from "@dom/operations/AddNodeCommand";
import DOMOperation from "@dom/diffing/DOMOperation";
import { DOMOperationType } from "@dom/diffing/DOMOperation";
import ElementNode from "@dom/virtual-dom/ElementNode";
import DOMQuery from "@dom/virtual-dom/DOMQuery";

describe("AddNodeCommand", () => {
  let container: ElementNode;
  let command: AddNodeCommand;
  let operation: DOMOperation;
  let newElement: ElementNode;

  beforeEach(() => {
    // Criando o contêiner e o novo elemento
    newElement = new ElementNode("div", { id: "new-element" }, []);
    container = new ElementNode("div", {}, []);

    // Criando a operação e o comando
    operation = new DOMOperation(DOMOperationType.ADD_NODE, newElement);
    command = new AddNodeCommand(operation);
  });

  it("should add the node to the container", () => {
    // Verificando se o novo elemento não está presente antes da execução
    expect(DOMQuery.findChildById(container, "new-element")).toBeUndefined();

    // Executando o comando
    command.execute(container.render());

    // Verificando se o novo elemento foi adicionado
    expect(DOMQuery.findChildById(container, "new-element")).not.toBeUndefined();
  });
});
