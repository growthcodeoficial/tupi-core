import { Element, ElementTag } from "@dom/virtual-dom/Node";

export default class DOMQuery {
  static findParentOf(targetNode: Element, container: Element): Element | null {
    // Assumindo que cada ElementNode mantém uma lista de seus filhos
    for (const child of (container as ElementTag)?.children) {
      if (child === targetNode) {
        return container;
      }

      const foundParent = DOMQuery.findParentOf(targetNode, child);
      if (foundParent) {
        return foundParent;
      }
    }

    return null;
  }

  static findChildById(container: Element, id: string): Element | undefined {
    return this.findChild(
      container,
      (element) => (element as ElementTag)?.props?.id === id
    );
  }

  static findChild(
    container: Element,
    predicate: (element: Element) => boolean
  ): Element | undefined {
    for (const child of (container as ElementTag)?.children) {
      if (predicate(child)) {
        return child;
      }
    }
    return undefined;
  }

  static findNodeById(container: Element, id: string): Element | null {
    if (id && (container as ElementTag)?.props?.id === id) {
      return container;
    }

    // Caso contrário, percorra os filhos do contêiner
    for (const child of (container as ElementTag)?.children) {
      if (child instanceof Element) {
        const foundNode = DOMQuery.findNodeById(child, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  }
}
