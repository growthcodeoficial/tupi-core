export interface Props {
  [key: string]: any;
}
export interface ElementTag {
  get type(): string;
  get props(): Props;
  get children(): Element[];
  addChild(node: Element): void;
  removeChild(node: Element): void;
  addNativeEventListener(
    eventType: string,
    listener: (event: Event) => void
  ): void;
  removeNativeEventListener(
    eventType: string,
    listener: (event: Event) => void
  ): void;
  render(): HTMLElement;
}

export interface ElementText {
  get type(): string;
  get text(): string;
  render(): Text;
}

export type Element = ElementTag | ElementText;

export default abstract class Node {
  // Um identificador único para cada nó, que pode ser útil para operações de diffing
  protected _id: string;

  constructor() {
    // Gere um identificador único para cada nó na criação
    this._id = this.generateUniqueId();
  }

  // Método para gerar um identificador único
  protected generateUniqueId(): string {
    return "_" + Math.random().toString(36).substring(2, 11);
  }

  // Método para obter o identificador único do nó
  get id(): string {
    return this._id;
  }
}
