import Action from "@state/Action";

export default interface Effect {
  execute(action: Action): void;
}
