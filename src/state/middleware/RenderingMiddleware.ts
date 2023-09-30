import Middleware from "@state/Middleware";
import Action from "@state/Action";
import Renderer from "@dom/virtual-dom/Renderer";
import { Element } from "@dom/virtual-dom/ElementNode";
import DiffingAlgorithm from "@dom/diffing/DiffingAlgorithm";
import VirtualDOMCreator from "@dom/diffing/VirtualDOMCreator";
import { Store } from "..";
import NodeComparator from "@dom/diffing/NodeComparator";

export default class RenderingMiddleware<TState> implements Middleware {
  private renderer: Renderer;
  private diffingAlgorithm: DiffingAlgorithm;
  private previousVirtualDOM: Element | null = null;
  private virtualDOMCreator: VirtualDOMCreator<TState>;

  constructor(
    private store: Store<TState>,
    virtualDOMCreator: VirtualDOMCreator<TState>
  ) {
    this.renderer = new Renderer();
    this.diffingAlgorithm = new DiffingAlgorithm(new NodeComparator());
    this.virtualDOMCreator = virtualDOMCreator;
  }

  execute(action: Action, next: (action: Action) => void): void {
    // Permitir que outros middlewares e reducers processem a ação primeiro
    next(action);

    // Obter o DOM virtual atualizado a partir do estado atualizado
    const updatedVirtualDOM = this.virtualDOMCreator.create(this.store.state);

    // Se é a primeira renderização, apenas renderize o DOM virtual diretamente
    if (this.previousVirtualDOM === null) {
      this.renderer.render(updatedVirtualDOM);
    } else {
      // Se não for a primeira renderização, use o algoritmo de diffing
      // para otimizar a renderização
      const diffResult = this.diffingAlgorithm.diff(
        this.previousVirtualDOM,
        updatedVirtualDOM
      );
      this.renderer.applyDiff(diffResult);
    }

    // Atualize o previousVirtualDOM para a próxima renderização
    this.previousVirtualDOM = updatedVirtualDOM;
  }
}
