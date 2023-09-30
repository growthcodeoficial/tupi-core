import DOMObservable from "@observability/DOMObservable";
import DOMEvent from "@observability/DOMEvent";
import Observer from "@observability/Observer";
import ElementNode, { Element } from "@dom/virtual-dom/ElementNode";

describe("DOMObservable", () => {
  let domObservable: DOMObservable;
  let observer: Observer<DOMEvent>;

  beforeEach(() => {
    domObservable = new DOMObservable();
    observer = {
      update: jest.fn(),
    };
    domObservable.addObserver(observer);
  });

  it("should bind and notify event", () => {
    // Criando um mock do ElementNode
    const mockElement = new ElementNode("button", {}, []) as any;
    const eventType = "click";

    // Mock do método addNativeEventListener
    jest
      .spyOn(mockElement, "addNativeEventListener")
      .mockImplementation((_, listener: any) => {
        // Simulando o evento
        listener({ type: eventType, target: mockElement });
      });

    // Vinculando o evento
    domObservable.bindEvent(mockElement, eventType);

    // Verificando se o observador foi notificado corretamente
    expect(observer.update).toHaveBeenCalledWith({
      type: eventType,
      target: mockElement,
    });
  });

  it("should notify event", () => {
    // Criando um mock do ElementNode
    const mockElement = new ElementNode("button", {}, []);
    const eventType = "click";

    // Notificando um evento
    domObservable.notifyEvent({
      type: eventType,
      target: mockElement,
    });

    // Verificando se o observador foi notificado corretamente
    expect(observer.update).toHaveBeenCalledWith({
      type: eventType,
      target: mockElement,
    });
  });
});
