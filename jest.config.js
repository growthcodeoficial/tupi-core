// jest.config.js
module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@dom/(.*)$": "<rootDir>/src/dom/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
