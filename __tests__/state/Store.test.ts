// __tests__/state/Store.test.ts
import Store from "@state/Store";
import Action from "@state/Action";
import Reducer from "@state/Reducer";

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

describe("Store", () => {
  it("should correctly dispatch actions and update the state", () => {
    const store = new Store(new TestReducer(), 0);
    store.dispatch(new TestAction());
    expect(store.state).toBe(1);
  });
});
