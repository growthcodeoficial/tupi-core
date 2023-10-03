import EventOperationCommand, {
  DOMEEventOperation,
} from "@dom/operations/event/EventOperationCommand";
import { Element, ElementTag } from "@dom/virtual-dom/Node";

export default class AddEventListenerCommand implements EventOperationCommand {
  constructor(public event: DOMEEventOperation, private targetNode: Element) {}

  execute(): void {
    (this.targetNode as ElementTag).addNativeEventListener(
      this.event.type,
      this.event.listener
    );
  }
}
