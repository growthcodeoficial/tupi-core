"use strict";
// tests/dom/virtual-dom/Renderer.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = __importDefault(require("@dom/virtual-dom/Renderer"));
const TextNode_1 = __importDefault(require("@dom/virtual-dom/TextNode"));
test("Renderer render", () => {
    const container = document.createElement("div");
    const textNode = new TextNode_1.default("Hello, World!");
    Renderer_1.default.render(textNode, container);
    expect(container.textContent).toBe("Hello, World!");
});
