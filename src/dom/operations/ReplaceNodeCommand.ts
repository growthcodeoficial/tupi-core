import DOMOperation from "@dom/diffing/DOMOperation";
import DOMOperationCommand from "@dom/operations/DOMOperationCommand";
import { Element } from "@dom/virtual-dom/ElementNode";

export default class ReplaceNodeCommand implements DOMOperationCommand {
  constructor(private operation: DOMOperation) {}

  execute(container: HTMLElement): void {
    const oldElement = this.operation.targetNode.render();
    const newElement = (this.operation.content as Element).render();
    container.replaceChild(newElement, oldElement);
  }
}
