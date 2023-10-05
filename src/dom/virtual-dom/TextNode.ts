import Node, { ElementText } from "@dom/virtual-dom//Node";

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
