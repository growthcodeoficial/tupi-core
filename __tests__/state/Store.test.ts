// __tests__/state/Store.test.ts
import Store from "@state/Store";
import Action from "@state/Action";
import Reducer from "@state/Reducer";
import Middleware from "@state/Middleware";

class TestAction extends Action {
  readonly type = "TEST_ACTION";
}

class InvalidAction extends Action {
  readonly type = "INVALID_ACTION";
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
  let store: Store<number>;
  let mockMiddleware: Middleware;

  beforeEach(() => {
    store = new Store(new TestReducer(), 0);
    mockMiddleware = {
      execute: jest.fn((action, next) => next(action)),
    };
  });

  it("should correctly dispatch actions and update the state", () => {
    store.dispatch(new TestAction());
    expect(store.state).toBe(1);
  });

  it("should register and execute middleware", () => {
    store.registerMiddleware(mockMiddleware);
    store.dispatch(new TestAction());
    expect(mockMiddleware.execute).toHaveBeenCalled();
  });

  it("should register and execute multiple middlewares", () => {
    const mockMiddleware2 = {
      execute: jest.fn((action, next) => next(action)),
    };
    store.registerMiddleware(mockMiddleware);
    store.registerMiddleware(mockMiddleware2);
    store.dispatch(new TestAction());
    expect(mockMiddleware.execute).toHaveBeenCalled();
    expect(mockMiddleware2.execute).toHaveBeenCalled();
  });

  it("should not change state on invalid action", () => {
    store.dispatch(new InvalidAction());
    expect(store.state).toBe(0);
  });

  const actionModifyingMiddleware: Middleware = {
    execute: (action, next) => {
      const modifiedAction = new TestAction();
      next(modifiedAction);
    },
  };

  it("should handle action modifying middleware", () => {
    store.registerMiddleware(actionModifyingMiddleware);
    store.dispatch(new InvalidAction());
    expect(store.state).toBe(1); // As the middleware changes the action to TestAction
  });
});
