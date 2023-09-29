import Node from "@dom/virtual-dom/Node";

export default class TextNode extends Node {
  constructor(private text: string) {
    super();
  }

  render(): Text {
    return document.createTextNode(this.text);
  }
}
