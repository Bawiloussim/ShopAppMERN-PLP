import api from './api';

export const authAPI = {
    login: (email, password) => {
        return api.post('/auth/login', { email, password });
    },
    register: (name, email, password) => {
        return api.post('/auth/register', { name, email, password });
    },
    getProfile: () => {
        return api.get('/auth/profile');
    },
    verifyToken: (token) => {
        // Cette méthode dépend de votre API backend
        return api.get('/auth/verify', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
    }
};