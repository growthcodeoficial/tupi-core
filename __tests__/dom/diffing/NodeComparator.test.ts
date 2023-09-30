import NodeComparator from "@dom/diffing/NodeComparator";
import ElementNode from "@dom/virtual-dom/ElementNode";

describe("NodeComparator", () => {
  const comparator = new NodeComparator();

  // 1. Nós com o mesmo tipo e as mesmas propriedades
  it("should return true for nodes with the same type and props", () => {
    const node1 = new ElementNode("div", { class: "test" }, []);
    const node2 = new ElementNode("div", { class: "test" }, []);
    expect(comparator.areEqual(node1, node2)).toBe(true);
  });

  // 2. Nós com o mesmo tipo mas com propriedades diferentes
  it("should return false for nodes with the same type but different props", () => {
    const node1 = new ElementNode("div", { class: "test" }, []);
    const node2 = new ElementNode("div", { id: "test" }, []);
    expect(comparator.areEqual(node1, node2)).toBe(false);
  });

  // 3. Nós com tipos diferentes
  it("should return false for nodes with different types", () => {
    const node1 = new ElementNode("div", { class: "test" }, []);
    const node2 = new ElementNode("span", { class: "test" }, []);
    expect(comparator.areEqual(node1, node2)).toBe(false);
  });

  // 4. Nós com o mesmo tipo e número de propriedades, mas com valores de propriedades diferentes
  it("should return false for nodes with the same type and prop keys but different prop values", () => {
    const node1 = new ElementNode("div", { class: "test" }, []);
    const node2 = new ElementNode("div", { class: "different" }, []);
    expect(comparator.areEqual(node1, node2)).toBe(false);
  });

  // 5. Nós com diferentes  propriedades, mas com valores de propriedades iguais
  it("should return false for nodes with the same number but different prop keys", () => {
    const node1 = new ElementNode("div", { class: "test" }, []);
    const node2 = new ElementNode("div", { style: "test" }, []);
    expect(comparator.areEqual(node1, node2)).toBe(false);
  });

  // 6. Nós com diferentes propriedades, mas com valores de propriedades iguais de acordo com a propriedade class
  it("should return false for nodes with different number of prop keys", () => {
    const node1 = new ElementNode("div", { class: "test", id: "123" }, []);
    const node2 = new ElementNode("div", { class: "test" }, []);
    expect(comparator.areEqual(node1, node2)).toBe(false);
  });
});
