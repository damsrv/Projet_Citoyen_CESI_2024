import type {Config} from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/singleton.ts', "<rootDir>/jest.setup.ts"],
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: [
        // '<rootDir>/src/app/**/*.{ts,tsx}', // Inclure les fichiers dans le dossier pages
        '<rootDir>/src/app/api/**/*.{ts}', // Inclure les fichiers dans le dossier pages
        // '<rootDir>/src/components/**/*.{ts,tsx}', // Inclure les fichiers dans le dossier components
        // '<rootDir>/lib/**/*.{ts,tsx}', // Inclure les fichiers dans le dossier lib
        '!**/__tests__/**', // Exclure les fichiers de tests
        '!**/*.d.ts', // Exclure les fichiers de déclaration TypeScript
    ],
    moduleNameMapper: {
        // Uncomment to provides the Next.js cache function
        //react: "next/dist/compiled/react/cjs/react.development.js",
        "^@/(.*)$": "<rootDir>/src/$1",
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)