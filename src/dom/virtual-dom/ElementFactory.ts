import ElementNode from "@dom/virtual-dom/ElementNode";
import { Element } from "@dom/virtual-dom/Node";
export class ElementFactory {
  static create(
    type: string,
    props: Record<string, any>,
    ...children: any[]
  ): Element {
    return new ElementNode(type, props, children);
  }
}
