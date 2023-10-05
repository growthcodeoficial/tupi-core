import { Element } from "@dom/virtual-dom/Node";

export default interface DOMOperationCommand {
  execute(container: Element | HTMLElement): void;
}
