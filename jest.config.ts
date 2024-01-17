module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  //   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  resetMocks: true,
  collectCoverageFrom: ["./src/**/**.(js|ts|tsx)"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/styleMock.ts",
  },
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
};
