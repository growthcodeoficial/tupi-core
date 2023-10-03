import EventOperationCommand, {
  DOMEEventOperation,
} from "@dom/operations/event/EventOperationCommand";
import { Element } from "@dom/virtual-dom/Node";

export default class TriggerEventCommand implements EventOperationCommand {
  constructor(public event: DOMEEventOperation, private targetNode: Element) {}

  execute(): void {
    const domElement = this.targetNode.render();
    domElement.dispatchEvent(new Event(this.event.type));
  }
}
