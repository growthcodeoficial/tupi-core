import { Element } from "@dom/virtual-dom/ElementNode";

export default class NodeComparator {
  areEqual(node1: Element, node2: Element): boolean {
    return (
      node1.type === node2.type && this.arePropsEqual(node1.props, node2.props)
    );
  }

  private arePropsEqual(
    props1: Record<string, any>,
    props2: Record<string, any>
  ): boolean {
    const keys1 = Object.keys(props1);
    const keys2 = Object.keys(props2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (props1[key] !== props2[key]) {
        return false;
      }
    }

    return true;
  }
}
