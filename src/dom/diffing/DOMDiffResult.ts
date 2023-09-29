import DOMOperation from "@dom/diffing/DOMOperation";

export default class DOMDiffResult {
  private operations: DOMOperation[];

  constructor(operations: DOMOperation[]) {
    this.operations = operations;
  }

  getOperations(): DOMOperation[] {
    return this.operations;
  }
}
