// __tests__/state/middleware/RenderingMiddleware.test.ts
import RenderingMiddleware from "@state/middleware/RenderingMiddleware";
import Action from "@state/Action";
import Renderer from "@dom/virtual-dom/Renderer";
import { Element } from "@dom/virtual-dom/Node";
import VirtualDOMCreator from "@dom/diffing/VirtualDOMCreator";
import Store from "@state/Store";
import ElementNode from "@dom/virtual-dom/ElementNode";

// Mocking Renderer static methods
jest.mock("@dom/virtual-dom/Renderer", () => ({
  render: jest.fn(),
  applyDiff: jest.fn(),
}));

// Mocking DiffingAlgorithm
jest.mock("@dom/diffing/DiffingAlgorithm", () => {
  return jest.fn().mockImplementation(() => {
    return {
      diff: jest.fn(),
    };
  });
});

// Mocking VirtualDOMCreator
const mockVirtualDOMCreator = {
  create: jest.fn(),
};

// Mocking Store
const mockStore = {
  state: {},
};

describe("RenderingMiddleware", () => {
  let renderingMiddleware: RenderingMiddleware<any>;
  let mockContainer: Element;
  let mockAction: Action;
  let nextMock: jest.Mock;

  beforeEach(() => {
    mockContainer = new ElementNode("div");
    mockAction = { type: "TEST_ACTION" } as Action;
    nextMock = jest.fn();
    renderingMiddleware = new RenderingMiddleware(
      mockStore as Store<any>,
      mockVirtualDOMCreator as VirtualDOMCreator<any>,
      mockContainer
    );
  });

  it("should execute next middleware and render", () => {
    // Setup mockVirtualDOMCreator to return a mock Element
    const mockElement = {} as Element;
    mockVirtualDOMCreator.create.mockReturnValue(mockElement);

    renderingMiddleware.execute(mockAction, nextMock);

    expect(nextMock).toHaveBeenCalledWith(mockAction);
    expect(Renderer.render).toHaveBeenCalledWith(mockElement, mockContainer);
  });
});
