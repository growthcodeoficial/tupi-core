import EventOperationCommand, {
  DOMEEventOperation,
} from "@dom/operations/event/EventOperationCommand";
import { Element, ElementTag } from "@dom/virtual-dom/Node";

export default class RemoveEventListenerCommand
  implements EventOperationCommand
{
  constructor(public event: DOMEEventOperation, private targetNode: Element) {}

  execute(): void {
    (this.targetNode as ElementTag).removeNativeEventListener(
      this.event.type,
      this.event.listener
    );
  }
}
