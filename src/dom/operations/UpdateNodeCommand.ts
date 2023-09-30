import DOMOperation from "@dom/diffing/DOMOperation";
import DOMOperationCommand from "@dom/operations/DOMOperationCommand";
import { Element } from "@dom/virtual-dom/ElementNode";

export default class UpdateNodeCommand implements DOMOperationCommand {
  constructor(private operation: DOMOperation) {}

  execute(container: HTMLElement): void {
    const targetID = (this.operation.targetNode as Element).props.id;
    const targetElement = container.querySelector(`#${targetID}`);

    if (targetElement && this.operation.content) {
      // Atualizando as propriedades do elemento target
      Object.assign(targetElement, (this.operation.content as Element).props);
    }
  }
}
