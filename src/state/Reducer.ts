import Action from "@state/Action";

export default interface Reducer<TState> {
  reduce(state: TState, action: Action): TState;
}
