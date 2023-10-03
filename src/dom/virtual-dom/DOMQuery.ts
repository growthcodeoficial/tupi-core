import { Element, ElementTag } from "@dom/virtual-dom/Node";
import ElementNode from "@dom/virtual-dom//ElementNode";

export default class DOMQuery {
  static isElementTag(obj: any): obj is ElementTag {
    return obj instanceof ElementNode;
  }

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
    if ((container as ElementTag)?.props?.id === id) {
      return container;
    }

    for (const child of (container as ElementTag)?.children) {
      if (DOMQuery.isElementTag(child)) {
        const foundChild = DOMQuery.findChildById(child, id);
        if (foundChild) {
          return foundChild;
        }
      }
    }
    return undefined;
  }

  static findChild(
    container: Element,
    predicate: (element: Element) => boolean
  ): Element | undefined {
    // Verificar se o próprio container satisfaz o predicado
    if (predicate(container)) {
      return container;
    }

    // Se não, verificar os filhos do container
    for (const child of (container as ElementTag)?.children) {
      // Se o filho satisfaz o predicado, retornar o filho
      if (predicate(child)) {
        return child;
      }

      // Se não, verificar os descendentes do filho recursivamente
      const foundDescendant = DOMQuery.findChild(child, predicate);
      if (foundDescendant) {
        return foundDescendant;
      }
    }

    // Se nenhum descendente satisfazer o predicado, retornar undefined
    return undefined;
  }

  static findNodeById(container: Element, id: string): Element | null {
    if ((container as ElementTag)?.props?.id === id) {
      return container;
    }

    for (const child of (container as ElementTag)?.children) {
      if (DOMQuery.isElementTag(child)) {
        const foundNode = DOMQuery.findNodeById(child, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  }
}
