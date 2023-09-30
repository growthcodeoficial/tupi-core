import Action from "@state/Action";
import Reducer from "@state/Reducer";
import Middleware from "@state/Middleware";

export default class Store<TState> {
  private middlewares: Middleware[] = [];
  private _state: TState;
  private dispatchChain!: (action: Action) => void;

  constructor(private reducer: Reducer<TState>, initialState: TState) {
    this._state = initialState;
    this.buildDispatchChain();
  }

  private buildDispatchChain(): void {
    // Construa a cadeia de funções de dispatch, começando com o reducer
    this.dispatchChain = (action) => {
      this._state = this.reducer.reduce(this._state, action);
    };

    // Em seguida, envolva cada middleware em torno da cadeia existente
    for (const middleware of this.middlewares.reverse()) {
      const next = this.dispatchChain;
      this.dispatchChain = (action) => middleware.execute(action, next);
    }
  }

  dispatch(action: Action): void {
    this.dispatchChain(action);
  }

  get state(): TState {
    return this._state;
  }

  registerMiddleware(middleware: Middleware): void {
    this.middlewares.push(middleware);
    // Reconstrua a cadeia de dispatch sempre que um novo middleware for registrado
    this.buildDispatchChain();
  }
}
