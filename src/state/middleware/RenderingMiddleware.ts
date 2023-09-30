import Middleware from "@state/Middleware";
import Action from "@state/Action";
import Renderer from "@dom/virtual-dom/Renderer";
import { Element } from "@dom/virtual-dom/ElementNode";

export default class RenderingMiddleware implements Middleware {
  private node: Element;
  private container: HTMLElement;

  constructor(node: Element, container: HTMLElement) {
    this.node = node;
    this.container = container;
  }

  execute(action: Action, next: (action: Action) => void): void {
    next(action);
    Renderer.render(this.node, this.container);
  }
}
