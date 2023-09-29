"use strict";
// tests/dom/virtual-dom/ElementFactory.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ElementFactory_1 = require("@dom/virtual-dom/ElementFactory");
const TextNode_1 = __importDefault(require("@dom/virtual-dom/TextNode"));
test("ElementFactory create", () => {
    const textNode = new TextNode_1.default("Hello, World!");
    const elementNode = ElementFactory_1.ElementFactory.create("div", { id: "test" }, textNode);
    const rendered = elementNode.render();
    expect(rendered.tagName).toBe("DIV");
    expect(rendered.id).toBe("test");
    expect(rendered.textContent).toBe("Hello, World!");
});
