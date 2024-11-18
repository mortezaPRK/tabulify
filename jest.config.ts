import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.test.ts', '**/*.test.tsx'], // Match test files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Resolve these extensions
};

export default config;
