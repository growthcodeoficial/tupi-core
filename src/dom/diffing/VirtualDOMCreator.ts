import { Element } from "@dom/virtual-dom/ElementNode";

export default interface VirtualDOMCreator<TState> {
  create(state: TState): Element;
}
