import Cookie from 'js-cookie';
import getNextCookie from 'next-cookies';
import TokenService from './TokenService';
import ErrorService from './ErrorService';
import { tokenRefreshEndpoint } from '../state/endpoints/user';

class AuthService {
    static async checkAuthentication(ctx) {
        const { accessToken, expiryDate } = TokenService.getAccessToken(ctx);
        const { refreshToken } = TokenService.getRefreshToken(ctx);
        if(!!accessToken && !TokenService.isAccessTokenExpired(expiryDate)) {
            return {
                isAuthenticated: true
            };
        }
        if(!!refreshToken) {
            try {
                const tokens = await tokenRefreshEndpoint(refreshToken);
                TokenService.setTokens(tokens);
                return {
                    isAuthenticated: true
                };
            } catch (error) {
                // ErrorService.handleError(error);
            }
        }
        return {
            isAuthenticated: false
        };
    }

    static onSignOut() {
        TokenService.revokeTokens();
        window.localStorage.setItem('signOut', `${Date.now()}`)
    }
}

export default AuthService;