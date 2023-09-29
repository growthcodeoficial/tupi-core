import Node from "@dom/virtual-dom/Node";

export default class Renderer {
  static render(node: Node, container: HTMLElement): void {
    container.appendChild(node.render());
  }
}
