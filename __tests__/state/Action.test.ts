import Action from "@state/Action";

class TestAction extends Action {
  readonly type = "TEST_ACTION";
}

describe("Action", () => {
  it("should correctly initialize with provided arguments", () => {
    const payload = { data: "test" };
    const action = new TestAction(payload);
    expect(action.payload).toEqual(payload);
  });
});
