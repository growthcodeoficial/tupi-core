import { Element } from "@dom/virtual-dom/Node";

export default interface VirtualDOMCreator<TState> {
  create(state: TState): Element;
}
