import Middleware from "@state/Middleware";
import Action from "@state/Action";
import Renderer from "@dom/virtual-dom/Renderer";
import { Element } from "@dom/virtual-dom/Node";
import DiffingAlgorithm from "@dom/diffing/DiffingAlgorithm";
import VirtualDOMCreator from "@dom/diffing/VirtualDOMCreator";
import NodeComparator from "@dom/diffing/NodeComparator";
import Store from "@state/Store";
export default class RenderingMiddleware<TState> implements Middleware {
  private diffingAlgorithm: DiffingAlgorithm;
  private previousVirtualDOM: Element | null = null;
  private virtualDOMCreator: VirtualDOMCreator<TState>;
  private container: Element;

  constructor(
    private store: Store<TState>,
    virtualDOMCreator: VirtualDOMCreator<TState>,
    container: Element
  ) {
    this.diffingAlgorithm = new DiffingAlgorithm(new NodeComparator());
    this.virtualDOMCreator = virtualDOMCreator;
    this.container = container;
  }

  execute(action: Action, next: (action: Action) => void): void {
    // Permitir que outros middlewares e reducers processem a ação primeiro
    next(action);

    // Obter o DOM virtual atualizado a partir do estado atualizado
    const updatedVirtualDOM = this.virtualDOMCreator.create(this.store.state);

    // Se é a primeira renderização, apenas renderize o DOM virtual diretamente
    if (this.previousVirtualDOM === null) {
      Renderer.render(updatedVirtualDOM, this.container);
    } else {
      // Se não for a primeira renderização, use o algoritmo de diffing
      // para otimizar a renderização
      const diffResult = this.diffingAlgorithm.diff(
        this.previousVirtualDOM,
        updatedVirtualDOM
      );
      Renderer.applyDiff(diffResult, this.container);
    }

    // Atualize o previousVirtualDOM para a próxima renderização
    this.previousVirtualDOM = updatedVirtualDOM;
  }
}
