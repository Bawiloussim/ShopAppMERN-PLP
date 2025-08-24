const authService = require('../../services/auth');
const api = require('../../services/api');

// Mock de l'API
jest.mock('../../services/api', () => {
    return {
        post: jest.fn(),
        interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
        },
    };
});

// Accédez à la fonction login via authAPI
const login = authService.authAPI.login;

describe('Auth Services', () => {
    beforeEach(() => {
        api.post.mockClear();
    });

    test('login makes API call with correct parameters', async () => {
        const mockResponse = {
        data: {
            token: 'test-token',
            user: { id: 1, email: 'test@example.com' }
        }
        };
        
        api.post.mockResolvedValueOnce(mockResponse);

        const email = 'test@example.com';
        const password = 'password123';

        const result = await login(email, password);

        expect(api.post).toHaveBeenCalledWith(
            '/auth/login',
            { email, password }
        );
        
        // Correction: s'attendre à l'objet de réponse complet
        expect(result).toEqual(mockResponse);
    });
});