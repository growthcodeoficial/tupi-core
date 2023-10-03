// Importando as classes e tipos necessários
import AddEventListenerCommand from "@dom/operations/event/AddEventListenerCommand";
import { DOMEEventOperation } from "@dom/operations/event/EventOperationCommand";
import ElementNode from "@dom/virtual-dom/ElementNode";
import { ElementTag } from "@dom/virtual-dom/Node";

// Agrupando os testes relacionados a AddEventListenerCommand
describe("AddEventListenerCommand", () => {
  let targetNode: ElementTag;
  let eventOperation: DOMEEventOperation;
  let addEventListenerCommand: AddEventListenerCommand;

  // Configuração inicial antes de cada teste
  beforeEach(() => {
    // Criando um ElementNode de exemplo
    targetNode = new ElementNode("div", { id: "target" });

    // Definindo a operação de evento
    eventOperation = {
      type: "click",
      listener: jest.fn(), // Usando uma função mock para o listener
    };

    // Criando a instância do AddEventListenerCommand
    addEventListenerCommand = new AddEventListenerCommand(
      eventOperation,
      targetNode
    );
  });

  // Teste para verificar se addNativeEventListener é chamado com os argumentos corretos
  it("should call addNativeEventListener on the target node with correct arguments", () => {
    // Espiando o método addNativeEventListener
    jest.spyOn(targetNode, "addNativeEventListener").mockImplementation();

    // Executando o comando
    addEventListenerCommand.execute();

    // Verificando se addNativeEventListener foi chamado com os argumentos corretos
    expect(targetNode.addNativeEventListener).toHaveBeenCalledWith(
      eventOperation.type,
      eventOperation.listener
    );
  });
});
