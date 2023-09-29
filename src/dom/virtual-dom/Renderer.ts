import { Element } from "@dom/virtual-dom/ElementNode";
import { ElementText } from "@dom/virtual-dom/TextNode";

export default class Renderer {
  static render(node: Element | ElementText, container: HTMLElement): void {
    container.appendChild(node.render());
  }
}
