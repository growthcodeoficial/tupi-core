import DOMOperationCommand from "@dom/operations/DOMOperationCommand";

export interface DOMEEventOperation {
  type: string;
  listener: (event: Event) => void;
}

export default interface EventOperationCommand extends DOMOperationCommand {
  event: DOMEEventOperation;
  execute(): void;
}
