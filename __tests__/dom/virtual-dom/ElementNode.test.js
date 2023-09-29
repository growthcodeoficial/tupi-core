"use strict";
// tests/dom/virtual-dom/ElementNode.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ElementNode_1 = __importDefault(require("@dom/virtual-dom/ElementNode"));
const TextNode_1 = __importDefault(require("@dom/virtual-dom/TextNode"));
test("ElementNode render", () => {
    const textNode = new TextNode_1.default("Hello, World!");
    const elementNode = new ElementNode_1.default("div", { id: "test" }, [textNode]);
    const rendered = elementNode.render();
    expect(rendered.tagName).toBe("DIV");
    expect(rendered.id).toBe("test");
    expect(rendered.textContent).toBe("Hello, World!");
});
