import { DOMEEventOperation } from "@dom/operations/event/EventOperationCommand";
import RemoveEventListenerCommand from "@dom/operations/event/RemoveEventListenerCommand";
import ElementNode from "@dom/virtual-dom/ElementNode";
import { ElementTag } from "@dom/virtual-dom/Node";

describe("RemoveEventListenerCommand", () => {
  let targetNode: ElementTag;
  let eventOperation: DOMEEventOperation;
  let removeEventListenerCommand: RemoveEventListenerCommand;

  beforeEach(() => {
    // Criando um ElementNode de exemplo
    targetNode = new ElementNode("div", { id: "target" });

    // Definindo a operação de evento
    eventOperation = {
      type: "click",
      listener: jest.fn(), // Usando uma função mock para o listener
    };

    // Criando a instância do RemoveEventListenerCommand
    removeEventListenerCommand = new RemoveEventListenerCommand(
      eventOperation,
      targetNode
    );
  });

  it("should call removeNativeEventListener on the target node with correct arguments", () => {
    // Espiando o método removeNativeEventListener
    jest.spyOn(targetNode, "removeNativeEventListener").mockImplementation();

    // Executando o comando
    removeEventListenerCommand.execute();

    // Verificando se removeNativeEventListener foi chamado com os argumentos corretos
    expect(targetNode.removeNativeEventListener).toHaveBeenCalledWith(
      eventOperation.type,
      eventOperation.listener
    );
  });
});
