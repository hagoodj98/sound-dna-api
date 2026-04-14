module.exports = {
  preset: "jest-expo",
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/app-example/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
