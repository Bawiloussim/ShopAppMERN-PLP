module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.js'],
    testTimeout: 30000,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/config/',
        '/models/'
    ]
};