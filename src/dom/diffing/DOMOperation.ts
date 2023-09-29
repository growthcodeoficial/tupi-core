import { Element } from "@dom/virtual-dom/ElementNode";

export enum DOMOperationType {
  ADD_NODE,
  REMOVE_NODE,
  REPLACE_NODE,
  UPDATE_NODE,
}

export default class DOMOperation {
  private _type: DOMOperationType;
  private _targetNode: Element;
  private _content?: Element;

  constructor(type: DOMOperationType, targetNode: Element, content?: Element) {
    this._type = type;
    this._targetNode = targetNode;
    this._content = content;
  }

  get type(): DOMOperationType {
    return this._type;
  }

  get targetNode(): Element {
    return this._targetNode;
  }

  get content(): Element | undefined {
    return this._content;
  }
}
