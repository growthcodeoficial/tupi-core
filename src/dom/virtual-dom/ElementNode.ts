import Node, { Element, ElementTag, Props } from "@dom/virtual-dom/Node";
export default class ElementNode extends Node implements ElementTag {
  private _type: string;
  private _props: Props;
  private _children: Element[];

  private _eventListeners: Record<string, ((event: Event) => void)[]> = {};
  private _domElements: Map<
    HTMLElement,
    Record<string, ((event: Event) => void)[]>
  > = new Map();

  constructor(type: string, props: Props = {}, children: Element[] = []) {
    super();
    this._type = type;
    this._props = { ...props };
    this._children = [...children];
    this._eventListeners = {};
  }

  get type(): string {
    return this._type;
  }

  get props(): Props {
    return { ...this._props };
  }

  get children(): Element[] {
    return [...this._children];
  }

  set props(newProps: Props) {
    this._props = { ...newProps };
  }

  set children(newChildren: Element[]) {
    this._children = [...newChildren];
  }

  updateProps(newProps: Object): void {
    this._props = { ...this._props, ...newProps };
  }

  addChild(node: Element): void {
    this._children.push(node);
  }

  removeChild(node: Element): void {
    const index = this._children.indexOf(node);
    if (index !== -1) {
      this._children.splice(index, 1);
    }
  }

  replaceChild(newNode: Element, oldNode: Element): void {
    const index = this._children.indexOf(oldNode);
    if (index !== -1) {
      this._children[index] = newNode;
    }
  }

  addNativeEventListener(
    eventType: string,
    listener: (event: Event) => void
  ): void {
    // Se não houver uma entrada para este tipo de evento, crie uma
    if (!this._eventListeners[eventType]) {
      this._eventListeners[eventType] = [];
    }

    // Adiciona o listener à lista de listeners para este tipo de evento
    this._eventListeners[eventType].push(listener);
  }

  removeNativeEventListener(
    eventType: string,
    listener: (event: Event) => void
  ): void {
    // Verifica se há uma entrada para este tipo de evento
    if (this._eventListeners[eventType]) {
      // Encontra o índice do listener na lista de listeners para este tipo de evento
      const index = this._eventListeners[eventType].indexOf(listener);
      if (index !== -1) {
        // Remove o listener da lista de listeners
        this._eventListeners[eventType].splice(index, 1);
      }
    }

    // Remove o listener do elemento DOM real
    for (const [element, listeners] of this._domElements) {
      if (listeners[eventType]) {
        const index = listeners[eventType].indexOf(listener);
        if (index !== -1) {
          element.removeEventListener(eventType, listener);
          listeners[eventType].splice(index, 1);
        }
      }
    }
  }

  applyEventListeners(element: HTMLElement): void {
    for (const eventType in this._eventListeners) {
      for (const listener of this._eventListeners[eventType]) {
        element.addEventListener(eventType, listener);
      }
    }

    // Manter um registro do elemento DOM e seus listeners
    this._domElements.set(element, { ...this._eventListeners });
  }

  render(): HTMLElement {
    // Cria um novo elemento HTML
    const element = document.createElement(this._type);
    // Aplica todas as propriedades ao elemento
    for (const key in this._props) {
      if (Object.prototype.hasOwnProperty.call(this._props, key)) {
        const value = this._props[key];
        element.setAttribute(key, value);
      }
    }

    // Renderiza e anexa todos os nós filhos
    for (const child of this._children) {
      const childElement = child.render();
      element.appendChild(childElement);
    }

    // Aplica os listeners de eventos registrados
    this.applyEventListeners(element);

    return element;
  }
}
