// Importando as classes e tipos necessários
import { DOMEEventOperation } from "@dom/operations/event/EventOperationCommand";
import TriggerEventCommand from "@dom/operations/event/TriggerEventCommand";
import ElementNode from "@dom/virtual-dom/ElementNode";
import { ElementTag } from "@dom/virtual-dom/Node";

// Agrupando os testes relacionados a TriggerEventCommand
describe("TriggerEventCommand", () => {
  let targetNode: ElementTag;
  let eventOperation: DOMEEventOperation;
  let triggerEventCommand: TriggerEventCommand;

  // Configuração inicial antes de cada teste
  beforeEach(() => {
    // Criando um ElementNode de exemplo
    targetNode = new ElementNode("div", { id: "target" });

    // Definindo a operação de evento
    eventOperation = {
      type: "click",
      listener: jest.fn(), // Usando uma função mock para o listener, embora não seja usado neste caso
    };

    // Criando a instância do TriggerEventCommand
    triggerEventCommand = new TriggerEventCommand(eventOperation, targetNode);
  });

  // Teste para verificar se dispatchEvent é chamado com os argumentos corretos
  it("should call dispatchEvent on the DOM element with correct arguments", () => {
    // Criando um elemento DOM real
    const mockDOMElement = new ElementNode("div").render();

    // Espiando o método dispatchEvent do mockDOMElement
    jest.spyOn(mockDOMElement, "dispatchEvent");

    // Substituindo o método render de targetNode para retornar o mockDOMElement
    jest.spyOn(targetNode, "render").mockReturnValue(mockDOMElement);

    // Executando o comando
    triggerEventCommand.execute();

    // Verificando se dispatchEvent foi chamado com os argumentos corretos
    expect(mockDOMElement.dispatchEvent).toHaveBeenCalledWith(
      expect.any(Event) // Espera que seja chamado com uma instância de Event
    );
  });
});
