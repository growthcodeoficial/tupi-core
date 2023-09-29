import ElementNode from "@dom/virtual-dom/ElementNode";
import Node from "@dom/virtual-dom/Node";

export class ElementFactory {
  static create(
    type: string,
    props: Record<string, any>,
    ...children: Node[]
  ): ElementNode {
    return new ElementNode(type, props, children);
  }
}
