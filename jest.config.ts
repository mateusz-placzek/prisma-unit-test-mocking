import type { Config } from '@jest/types';

const ignoredPatterns = [
  '/node_modules/',
  '/dist/',
  '<rootDir>/volumes/',
  '<rootDir>/prisma/',
];

const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ignoredPatterns,
  watchPathIgnorePatterns: ignoredPatterns,
  testMatch: [`<rootDir>/**/*.test.ts`],
  moduleDirectories: ['<rootDir>/node_modules'],
};

export default module.exports = config;
