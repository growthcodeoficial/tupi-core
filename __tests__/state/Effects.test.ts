import Effect from "@state/Effect";
import Action from "@state/Action";

class TestAction extends Action {
  readonly type = "TEST_ACTION";
}

class TestEffect implements Effect {
  execute(action: Action): void {
    // Implementation for testing
  }
}

describe("Effect", () => {
  it("should execute without errors", () => {
    const effect = new TestEffect();
    expect(() => effect.execute(new TestAction())).not.toThrow();
  });
});
