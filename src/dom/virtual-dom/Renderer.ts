import DOMDiffResult from "@dom/diffing/DOMDiffResult";
import DOMOperation, { DOMOperationType } from "@dom/diffing/DOMOperation";
import AddNodeCommand from "@dom/operations/AddNodeCommand";
import DOMOperationCommand from "@dom/operations/DOMOperationCommand";
import RemoveNodeCommand from "@dom/operations/RemoveNodeCommand";
import { ReplaceNodeCommand } from "@dom/operations/ReplaceNodeCommand";
import UpdateNodeCommand from "@dom/operations/UpdateNodeCommand";
import { Element } from "@dom/virtual-dom/ElementNode";
import { ElementText } from "@dom/virtual-dom/TextNode";

export default class Renderer {
  static render(node: Element | ElementText, container: HTMLElement): void {
    container.appendChild(node.render());
  }

  static applyDiff(diffResult: DOMDiffResult, container: HTMLElement): void {
    for (const operation of diffResult.operations) {
      const command = this.createCommand(operation);
      command.execute(container);
    }
  }

  private static createCommand(operation: DOMOperation): DOMOperationCommand {
    switch (operation.type) {
      case DOMOperationType.ADD_NODE:
        return new AddNodeCommand(operation);
      case DOMOperationType.REMOVE_NODE:
        return new RemoveNodeCommand(operation);
      case DOMOperationType.REPLACE_NODE:
        return new ReplaceNodeCommand(operation);
      case DOMOperationType.UPDATE_NODE:
        return new UpdateNodeCommand(operation);
      default:
        throw new Error(`Unsupported operation type: ${operation.type}`);
    }
  }
}
