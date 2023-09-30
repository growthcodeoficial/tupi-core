// __tests__/dom/virtual-dom/DOMQuery.test.ts
import DOMQuery from "@dom/virtual-dom/DOMQuery";
import ElementNode from "@dom/virtual-dom/ElementNode";

describe("DOMQuery", () => {
  let container: ElementNode;
  let child1: ElementNode;
  let child2: ElementNode;

  beforeEach(() => {
    // Criando nós
    child1 = new ElementNode("div", { id: "child-1" }, []);
    child2 = new ElementNode("div", { id: "child-2" }, []);
    container = new ElementNode("div", {}, [child1, child2]);
  });

  describe("findChildById", () => {
    it("should find a child by id", () => {
      const foundChild = DOMQuery.findChildById(container, "child-1");
      expect(foundChild).toEqual(child1);
    });

    it("should return undefined if no child matches the id", () => {
      const foundChild = DOMQuery.findChildById(container, "non-existent-id");
      expect(foundChild).toBeUndefined();
    });
  });

  describe("findChild", () => {
    it("should find a child based on the predicate", () => {
      const foundChild = DOMQuery.findChild(
        container,
        (element) => element.props.id === "child-2"
      );
      expect(foundChild).toEqual(child2);
    });

    it("should return undefined if no child matches the predicate", () => {
      const foundChild = DOMQuery.findChild(
        container,
        (element) => element.props.id === "non-existent-id"
      );
      expect(foundChild).toBeUndefined();
    });
  });
});
