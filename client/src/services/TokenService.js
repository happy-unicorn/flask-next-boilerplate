import Cookie from 'js-cookie';
import getNextCookie from 'next-cookies';
import parseJwt from '../utils/parseJwt';

class TokenService {
    static setTokens({ access_token, refresh_token }) {
        Cookie.set('accessToken', access_token);
        Cookie.set('refreshToken', refresh_token);
        Cookie.set('expiryDate', TokenService.getExpiryDate(access_token));
    }

    static getExpiryDate(accessToken) {
        const { exp: expiryDate } = parseJwt(accessToken);
        return expiryDate;
    };

    static getAccessToken(ctx) {
        if(ctx){
            const { accessToken, expiryDate } = getNextCookie(ctx);
            return { accessToken, expiryDate };
        } else {
            return {
                accessToken: Cookie.get('accessToken'),
                expiryDate: Cookie.get('expiryDate')
            }
        }
    }

    static getRefreshToken(ctx) {
        if(ctx) {
            const { refreshToken } = getNextCookie(ctx);
            return { refreshToken };
        } else {
            return {
                refreshToken: Cookie.get('refreshToken')
            }
        }
    }

    static revokeTokens() {
        Cookie.remove('accessToken');
        Cookie.remove('refreshToken');
        Cookie.remove('expiryDate');
    }

    static isAccessTokenExpired(expiryDate) {
        const accessTokenExpiryDate = expiryDate - 10;
        const nowTime = Math.floor(new Date().getTime() / 1000);
        return accessTokenExpiryDate < nowTime;
    }
}

export default TokenService;