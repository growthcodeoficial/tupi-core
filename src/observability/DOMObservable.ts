import Observable from "@observability/Observable";
import DOMEvent from "@observability/DOMEvent";

export default class DOMObservable extends Observable<DOMEvent> {
  // Método para vincular um evento DOM a um elemento específico
  bindEvent(element: Element, eventType: string): void {
    element.addEventListener(eventType, (event) => {
      // Converte o evento nativo para um DOMEvent e notifica os observadores
      const domEvent: DOMEvent = {
        type: event.type,
        target: event.target as Element,
      };
      this.notifyObservers(domEvent);
    });
  }

  // Método para notificar observadores sobre um evento DOM
  notifyEvent(event: DOMEvent): void {
    this.notifyObservers(event);
  }
}
