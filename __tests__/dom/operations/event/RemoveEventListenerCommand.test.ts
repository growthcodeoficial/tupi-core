// Importações necessárias
import RemoveEventListenerCommand from "@dom/operations/event/RemoveEventListenerCommand"; 
import { DOMEEventOperation } from "@dom/operations/event/EventOperationCommand";
import { Element, ElementTag } from "@dom/virtual-dom/Node";

describe("RemoveEventListenerCommand", () => {
  let mockElement: jest.Mocked<ElementTag>;
  let removeEventListenerCommand: RemoveEventListenerCommand;
  let mockEvent: DOMEEventOperation;

  beforeEach(() => {
    mockElement = {
      removeNativeEventListener: jest.fn(),
    } as unknown as jest.Mocked<ElementTag>;

    // Configurando um evento mock
    mockEvent = {
      type: "click",
      listener: jest.fn(),
    };

    removeEventListenerCommand = new RemoveEventListenerCommand(
      mockEvent,
      mockElement
    );
  });

  it("should call removeNativeEventListener with correct arguments", () => {
    removeEventListenerCommand.execute();

    // Verificando se removeNativeEventListener foi chamado com os argumentos corretos
    expect(mockElement.removeNativeEventListener).toHaveBeenCalledWith(
      mockEvent.type,
      mockEvent.listener
    );
  });
});
