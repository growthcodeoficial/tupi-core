import Action from "@state/Action";

export default interface Middleware {
  execute(action: Action, next: (action: Action) => void): void;
}
