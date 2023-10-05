// src/dom/virtual-dom/__tests__/decorators.ts
export function Testable(target: Function) {
  target.prototype.type = jest.fn(() => "TestNode");
  target.prototype.generateUniqueId = jest.fn(() => "_mockedUniqueId");
}
