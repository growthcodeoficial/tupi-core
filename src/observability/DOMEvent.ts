import { Element } from "@dom/virtual-dom/Node";
export default interface DOMEvent {
  type: string; // Tipo de evento (por exemplo, 'click', 'change', etc.)
  target: Element;
}
