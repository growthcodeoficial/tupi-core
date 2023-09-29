import Middleware from "@state/Middleware";
import Action from "@state/Action";

class TestAction extends Action {
  readonly type = "TEST_ACTION";
}

class TestMiddleware implements Middleware {
  execute(action: Action, next: (action: Action) => void): void {
    next(action);
  }
}

describe("Middleware", () => {
  it("should execute without errors", () => {
    const middleware = new TestMiddleware();
    expect(() => middleware.execute(new TestAction(), () => {})).not.toThrow();
  });
});
