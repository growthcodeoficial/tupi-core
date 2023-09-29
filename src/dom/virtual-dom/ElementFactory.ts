import ElementNode, { Element } from "@dom/virtual-dom/ElementNode";
export class ElementFactory {
  static create(
    type: string,
    props: Record<string, any>,
    ...children: any[]
  ): ElementNode {
    return new ElementNode(type, props, children);
  }
}
