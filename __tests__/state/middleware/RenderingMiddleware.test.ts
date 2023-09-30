// __tests__/state/middleware/RenderingMiddleware.test.ts
import RenderingMiddleware from "@state/middleware/RenderingMiddleware";
import Action from "@state/Action";
import Renderer from "@dom/virtual-dom/Renderer";
import { Element } from "@dom/virtual-dom/ElementNode";

jest.mock("@dom/virtual-dom/Renderer", () => ({
  render: jest.fn(),
}));

describe("RenderingMiddleware", () => {
  let renderingMiddleware: RenderingMiddleware;
  let mockNode: Element;
  let mockContainer: HTMLElement;
  let mockAction: Action;
  let nextMock: jest.Mock;

  beforeEach(() => {
    mockNode = {} as Element;
    mockContainer = document.createElement("div");
    mockAction = { type: "TEST_ACTION" } as Action;
    nextMock = jest.fn();
    renderingMiddleware = new RenderingMiddleware(mockNode, mockContainer);
  });

  it("should execute next middleware and render", () => {
    renderingMiddleware.execute(mockAction, nextMock);
    expect(nextMock).toHaveBeenCalledWith(mockAction);
    expect(Renderer.render).toHaveBeenCalledWith(mockNode, mockContainer);
  });
});
