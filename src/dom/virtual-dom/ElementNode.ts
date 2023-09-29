import Node from "@dom/virtual-dom/Node";

export default class ElementNode extends Node {
  constructor(
    private type: string,
    private props: Record<string, any>,
    private children: Node[]
  ) {
    super();
  }

  render(): HTMLElement {
    const element = document.createElement(this.type);

    for (const [key, value] of Object.entries(this.props)) {
      element.setAttribute(key, value);
    }

    for (const child of this.children) {
      element.appendChild(child.render());
    }

    return element;
  }
}
