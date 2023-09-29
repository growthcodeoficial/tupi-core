import { Element } from "@dom/virtual-dom/ElementNode";

export enum DOMOperationType {
  ADD_NODE,
  REMOVE_NODE,
  REPLACE_NODE,
  UPDATE_NODE,
}

export default class DOMOperation {
  private type: DOMOperationType;
  private targetNode: Element;
  private content?: Element;

  constructor(type: DOMOperationType, targetNode: Element, content?: Element) {
    this.type = type;
    this.targetNode = targetNode;
    this.content = content;
  }

  getType(): DOMOperationType {
    return this.type;
  }

  getTargetNode(): Element {
    return this.targetNode;
  }

  getContent(): Element | undefined {
    return this.content;
  }
}
