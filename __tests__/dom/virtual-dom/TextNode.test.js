"use strict";
// tests/dom/virtual-dom/TextNode.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextNode_1 = __importDefault(require("@dom/virtual-dom/TextNode"));
test("TextNode render", () => {
    const textNode = new TextNode_1.default("Hello, World!");
    expect(textNode.render().textContent).toBe("Hello, World!");
});
