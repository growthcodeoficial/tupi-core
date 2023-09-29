"use strict";
// tests/dom/virtual-dom/Node.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("@dom/virtual-dom/Node"));
class MockNode extends Node_1.default {
    render() {
        return document.createTextNode("MockNode");
    }
}
test("MockNode render", () => {
    const node = new MockNode();
    expect(node.render().textContent).toBe("MockNode");
});
