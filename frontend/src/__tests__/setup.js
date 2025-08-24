require('@testing-library/jest-dom');

// Ajoutez ces lignes pour TextEncoder et TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock pour les APIs navigateurs
global.matchMedia = global.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

// Mock pour localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock pour les images
global.Image = class {
    constructor() {
        setTimeout(() => {
        if (this.onload) {
            this.onload();
        }
        }, 0);
    }
};

// Mock pour window.scrollTo
global.scrollTo = jest.fn();