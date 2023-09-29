import Action from "@state/Action";
import Reducer from "@state/Reducer";

export default class Store<TState> {
  private _state: TState;

  constructor(private reducer: Reducer<TState>, initialState: TState) {
    this._state = initialState;
  }

  dispatch(action: Action): void {
    this._state = this.reducer.reduce(this._state, action);
  }

  get state(): TState {
    return this._state;
  }
}
