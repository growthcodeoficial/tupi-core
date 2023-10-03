// __tests__/dom/virtual-dom/DOMQuery.test.ts
import DOMQuery from "@dom/virtual-dom/DOMQuery";
import ElementNode from "@dom/virtual-dom/ElementNode";
import { Element, ElementTag } from "@dom/virtual-dom/Node";

describe("DOMQuery", () => {
  let container: Element;
  let child1: Element;
  let child2: Element;

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
        (element) => (element as ElementTag).props.id === "child-2"
      );
      expect(foundChild).toEqual(child2);
    });

    it("should return undefined if no child matches the predicate", () => {
      const foundChild = DOMQuery.findChild(
        container,
        (element) => (element as ElementTag).props.id === "non-existent-id"
      );
      expect(foundChild).toBeUndefined();
    });
  });

  describe("findParentOf", () => {
    it("should find the parent of a given node", () => {
      const parent = DOMQuery.findParentOf(child1, container);
      expect(parent).toEqual(container);
    });

    it("should return null if the node has no parent within the container", () => {
      const orphanNode = new ElementNode("div", { id: "orphan" }, []);
      const parent = DOMQuery.findParentOf(orphanNode, container);
      expect(parent).toBeNull();
    });
  });

  describe("findNodeById", () => {
    it("should find a node by id", () => {
      const foundNode = DOMQuery.findNodeById(container, "child-1");
      expect(foundNode).toEqual(child1);
    });

    it("should return null if no node matches the id", () => {
      const foundNode = DOMQuery.findNodeById(container, "non-existent-id");
      expect(foundNode).toBeNull();
    });
  });
});
