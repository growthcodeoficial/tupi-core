// __tests__/dom/virtual-dom/DOMQuery.test.ts
import DOMQuery from "@dom/virtual-dom/DOMQuery";
import ElementNode from "@dom/virtual-dom/ElementNode";
import { Element, ElementTag } from "@dom/virtual-dom/Node";

describe("DOMQuery", () => {
  let grandparent: Element;
  let parent: Element;
  let child: Element;

  beforeEach(() => {
    // Criando nós
    child = new ElementNode("div", { id: "child" });
    parent = new ElementNode("div", { id: "parent" }, [child]);
    grandparent = new ElementNode("div", { id: "grandparent" }, [parent]);
  });

  describe("isElementTag", () => {
    it("should return true for ElementTag", () => {
      expect(DOMQuery.isElementTag(parent)).toBeTruthy();
    });

    it("should return false for non-ElementTag", () => {
      expect(DOMQuery.isElementTag({})).toBeFalsy();
    });
  });

  describe("findParentOf", () => {
    it("should find a parent in a deeper recursion", () => {
      const foundParent = DOMQuery.findParentOf(child, grandparent);
      expect(foundParent).toEqual(parent);
    });

    it("should return null if the node has no parent within the container", () => {
      const foundParent = DOMQuery.findParentOf(child, child);
      expect(foundParent).toBeNull();
    });
  });

  describe("findChildById", () => {
    it("should find a child by id", () => {
      const foundChild = DOMQuery.findChildById(grandparent, "child");
      expect(foundChild).toEqual(child);
    });

    it("should return undefined if no child matches the id", () => {
      const foundChild = DOMQuery.findChildById(grandparent, "non-existent-id");
      expect(foundChild).toBeUndefined();
    });

    it("should handle container with no children in findChildById", () => {
      const container = new ElementNode("div", { id: "container" });
      const foundChild = DOMQuery.findChildById(container, "child");
      expect(foundChild).toBeUndefined();
    });
  });

  describe("findChild", () => {
    it("should find a child based on the predicate", () => {
      const foundChild = DOMQuery.findChild(
        grandparent,
        (element) => (element as ElementTag).props.id === "child"
      );
      expect(foundChild).toEqual(child);
    });

    it("should return the container if it satisfies the predicate", () => {
      const foundChild = DOMQuery.findChild(
        grandparent,
        (element) => (element as ElementTag).props.id === "grandparent"
      );
      expect(foundChild).toEqual(grandparent);
    });

    it("should return undefined if no child matches the predicate", () => {
      const foundChild = DOMQuery.findChild(
        grandparent,
        (element) => (element as ElementTag).props.id === "non-existent-id"
      );
      expect(foundChild).toBeUndefined();
    });
  });

  describe("findNodeById", () => {
    it("should find a node by id", () => {
      const foundNode = DOMQuery.findNodeById(grandparent, "child");
      expect(foundNode).toEqual(child);
    });

    it("should return null if no node matches the id", () => {
      const foundNode = DOMQuery.findNodeById(grandparent, "non-existent-id");
      expect(foundNode).toBeNull();
    });

    it("should return null when no child matches the id in findNodeById", () => {
      const child = new ElementNode("div", { id: "not-matching-id" });
      const container = new ElementNode("div", { id: "container" }, [child]);
      const foundNode = DOMQuery.findNodeById(container, "child");
      expect(foundNode).toBeNull();
    });
  });
});
