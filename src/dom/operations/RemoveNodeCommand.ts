import DOMOperation from "@dom/diffing/DOMOperation";
import DOMOperationCommand from "@dom/operations/DOMOperationCommand";

export default class RemoveNodeCommand implements DOMOperationCommand {
  constructor(private operation: DOMOperation) {}

  execute(container: HTMLElement): void {
    const targetElement = this.operation.targetNode.render();
    container.removeChild(targetElement);
  }
}
