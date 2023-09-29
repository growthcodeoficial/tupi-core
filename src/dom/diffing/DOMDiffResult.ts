import DOMOperation from "@dom/diffing/DOMOperation";

export default class DOMDiffResult {
  private _operations: DOMOperation[];

  constructor(operations: DOMOperation[]) {
    this._operations = operations;
  }

  get operations(): DOMOperation[] {
    return this._operations;
  }
}
