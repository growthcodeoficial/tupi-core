import { Element } from "@dom/virtual-dom/ElementNode";

export default class DOMQuery {
  static findChildById(container: Element, id: string): Element | undefined {
    return this.findChild(container, (element) => element.props.id === id);
  }

  static findChild(
    container: Element,
    predicate: (element: Element) => boolean
  ): Element | undefined {
    for (const child of container.children) {
      if (predicate(child as Element)) {
        return child as Element;
      }
    }
    return undefined;
  }
}
