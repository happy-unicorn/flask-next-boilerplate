import api from '../../services/APIService';

export function signUpEndpoint(values) {
    return api.post('/auth/sign_up', values);
}

export function signInEndpoint(values) {
    return api.post('/auth/sign_in', values);
}

export function signOutEndpoint(refreshToken) {
    return api.post(
        '/auth/sign_out', {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }
    );
}

export function tokenRefreshEndpoint(refreshToken) {
    return api.post(
        '/auth/token/refresh', {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }
    );
}