module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/src/__tests__/__mocks__/styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
        '<rootDir>/src/__tests__/__mocks__/fileMock.js',
    },
    testMatch: [
        '<rootDir>/src/__tests__/**/*.test.{js,jsx}',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/main.jsx',
        '!src/__tests__/**',
    ],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(react|@testing-library)/)',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/src/__tests__/__mocks__/',
        '<rootDir>/src/__tests__/setup.js',
    ]
};

