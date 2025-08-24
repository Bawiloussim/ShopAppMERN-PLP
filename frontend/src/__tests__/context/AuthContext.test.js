const { render, renderHook, act } = require('@testing-library/react');
const { AuthProvider, useAuth } = require('../../context/AuthContext');
const { login, logout } = require('../../services/auth');

// Mock des services
jest.mock('../../services/auth');

describe('AuthContext', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('provides auth context to children', () => {
        const { getByText } = render(
        <AuthProvider>
            <div>Test Child</div>
        </AuthProvider>
        );

        expect(getByText('Test Child')).toBeInTheDocument();
    });
});