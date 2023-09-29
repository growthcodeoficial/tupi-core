import DOMDiffResult from "@dom/diffing/DOMDiffResult";
import NodeComparator from "@dom/diffing/NodeComparator";
import DOMOperation, { DOMOperationType } from "@dom/diffing/DOMOperation";
import { Element } from "@dom/virtual-dom/ElementNode";

export default class DiffingAlgorithm {
  private comparator: NodeComparator;

  constructor(comparator: NodeComparator) {
    this.comparator = comparator;
  }

  diff(oldNode: Element, newNode: Element): DOMDiffResult {
    const operations: DOMOperation[] = [];
    this.compareNodes(oldNode, newNode, operations);
    return new DOMDiffResult(operations);
  }

  private compareNodes(
    oldNode: Element,
    newNode: Element,
    operations: DOMOperation[]
  ): void {
    if (!this.comparator.areEqual(oldNode, newNode)) {
      operations.push(
        new DOMOperation(DOMOperationType.REPLACE_NODE, oldNode, newNode)
      );
      return;
    }

    const oldChildren = oldNode.children;
    const newChildren = newNode.children;
    const commonLength = Math.min(oldChildren.length, newChildren.length);

    for (let i = 0; i < commonLength; i++) {
      this.compareNodes(oldChildren[i], newChildren[i], operations);
    }

    if (oldChildren.length > newChildren.length) {
      for (let i = commonLength; i < oldChildren.length; i++) {
        operations.push(
          new DOMOperation(DOMOperationType.REMOVE_NODE, oldChildren[i])
        );
      }
    } else if (oldChildren.length < newChildren.length) {
      for (let i = commonLength; i < newChildren.length; i++) {
        operations.push(
          new DOMOperation(DOMOperationType.ADD_NODE, newNode, newChildren[i])
        );
      }
    }
  }
}
