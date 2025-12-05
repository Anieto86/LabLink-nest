module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: ".",
	testRegex: ".*.spec.ts$",
	coverageDirectory: "./coverage",
	collectCoverageFrom: ["src/**/*.ts"],
};
