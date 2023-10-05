import { Selector } from "@state/Selector";

const testSelector: Selector<number, string> = (state) => state.toString();

describe("Selector", () => {
  it("should correctly select data from the state", () => {
    expect(testSelector(123)).toBe("123");
  });
});
