import DOMDiffResult from "@dom/diffing/DOMDiffResult";
import DOMOperation, { DOMOperationType } from "@dom/diffing/DOMOperation";
import ElementNode from "@dom/virtual-dom/ElementNode";

describe("DOMDiffResult", () => {
  it("should hold operations correctly", () => {
    const op = new DOMOperation(
      DOMOperationType.ADD_NODE,
      new ElementNode("div", {}, [])
    );
    const result = new DOMDiffResult([op]);
    expect(result.operations).toEqual([op]);
  });
});
