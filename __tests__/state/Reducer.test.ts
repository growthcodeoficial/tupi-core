import Reducer from "@state/Reducer";
import Action from "@state/Action";

class TestAction extends Action {
  readonly type = "TEST_ACTION";
}

class TestReducer implements Reducer<number> {
  reduce(state: number, action: Action): number {
    if (action.type === "TEST_ACTION") {
      return state + 1;
    }
    return state;
  }
}

describe("Reducer", () => {
  it("should correctly reduce the state", () => {
    const reducer = new TestReducer();
    expect(reducer.reduce(0, new TestAction())).toBe(1);
  });
});
