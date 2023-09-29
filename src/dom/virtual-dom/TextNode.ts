import Node from "@dom/virtual-dom/Node";

export interface ElementText {
  get type(): string;
  get text(): string;
  render(): Text;
}

export default class TextNode extends Node implements ElementText {
  private _text: string;

  constructor(text: string) {
    super();
    this._text = text;
  }

  get text(): string {
    return this._text;
  }

  set text(newText: string) {
    this._text = newText;
  }

  get type(): string {
    return "#text";
  }

  render(): Text {
    return document.createTextNode(this._text);
  }
}
