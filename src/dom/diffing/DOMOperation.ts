import { DOMEEventOperation } from "@dom/operations/event/EventOperationCommand";
import { Element } from "@dom/virtual-dom/Node";

export enum DOMOperationType {
  ADD_NODE,
  REMOVE_NODE,
  REPLACE_NODE,
  UPDATE_NODE,
  ADD_EVENT_LISTENER,
  REMOVE_EVENT_LISTENER,
  TRIGGER_EVENT,
}

export default class DOMOperation {
  private _type: DOMOperationType;
  private _targetNode: Element;
  private _content?: Element | DOMEEventOperation;

  constructor(
    type: DOMOperationType,
    targetNode: Element,
    content?: Element | DOMEEventOperation
  ) {
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

  get content(): Element | DOMEEventOperation | undefined {
    return this._content;
  }
}
