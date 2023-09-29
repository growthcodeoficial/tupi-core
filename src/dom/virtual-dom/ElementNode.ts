import Node from "@dom/virtual-dom/Node";

export interface Props {
  [key: string]: any;
}
export interface Element {
  get type(): string;
  get props(): Props;
  get children(): Element[];
  render(): HTMLElement;
}

export default class ElementNode extends Node implements Element {
  private _type: string;
  private _props: Props;
  private _children: Element[];

  constructor(type: string, props: Props, children: Element[]) {
    super();
    this._type = type;
    this._props = { ...props };
    this._children = [...children];
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

    return element;
  }
}
