import Observable from "@observability/Observable";
import DOMEvent from "@observability/DOMEvent";
import { Element, ElementTag } from "@dom/virtual-dom/Node";

export default class DOMObservable extends Observable<DOMEvent> {
  // Método para vincular um evento DOM a um elemento específico
  bindEvent(element: Element, eventType: string): void {
    (element as ElementTag).addNativeEventListener(eventType, (event) => {
      // Converte o evento nativo para um DOMEvent e notifica os observadores
      const domEvent: DOMEvent = {
        type: event.type,
        target: event.target as any,
      };
      this.notifyObservers(domEvent);
    });
  }

  // Método para notificar observadores sobre um evento DOM
  notifyEvent(event: DOMEvent): void {
    this.notifyObservers(event);
  }
}
