import DOMDiffResult from "@dom/diffing/DOMDiffResult";
import DOMOperation, { DOMOperationType } from "@dom/diffing/DOMOperation";
import DOMOperationCommand from "@dom/operations/DOMOperationCommand";
import AddEventListenerCommand from "@dom/operations/event/AddEventListenerCommand";
import { DOMEEventOperation } from "@dom/operations/event/EventOperationCommand";
import RemoveEventListenerCommand from "@dom/operations/event/RemoveEventListenerCommand";
import TriggerEventCommand from "@dom/operations/event/TriggerEventCommand";
import { Element, ElementTag } from "@dom/virtual-dom//Node";

export default class Renderer {
  static render(node: Element, container: Element): void {
    (container as ElementTag).addChild(node);
  }

  static applyDiff(diffResult: DOMDiffResult, container: Element): void {
    for (const operation of diffResult.operations) {
      const command = this.createCommand(operation);
      command.execute(container);
    }
  }

  private static createCommand(operation: DOMOperation): DOMOperationCommand {
    switch (operation.type) {
      case DOMOperationType.ADD_EVENT_LISTENER:
        return new AddEventListenerCommand(
          operation.content as DOMEEventOperation,
          operation.targetNode
        );
      case DOMOperationType.REMOVE_EVENT_LISTENER:
        return new RemoveEventListenerCommand(
          operation.content as DOMEEventOperation,
          operation.targetNode
        );
      case DOMOperationType.TRIGGER_EVENT:
        return new TriggerEventCommand(
          operation.content as DOMEEventOperation,
          operation.targetNode
        );
      default:
        throw new Error(`Unsupported operation type: ${operation.type}`);
    }
  }
}
