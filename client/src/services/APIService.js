import getConfig from 'next/config';
import axios from 'axios';
import TokenService from './TokenService';
import {
    AuthenticationError,
    ValidationError,
    UnknownError
} from './ErrorService';
import { tokenRefreshEndpoint } from '../state/endpoints/user';

class APIService {
    constructor(url) {
        this.methods = ['get', 'post', 'put', 'patch', 'delete'];
        this.api = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        this.api.interceptors.request.use(
            this.requestMiddleware,
            error => Promise.reject(error)
        );
        this.api.interceptors.response.use(
            response => response,
            this.responseErrorMiddleware
        );
        this.methods.forEach(method => {
            this[method] = (slug, data={}, config={}) => {
                const ultimateApi = method === 'post' || method === 'put' || method === 'patch'
                    ? this.api[method](slug, data, config)
                    : this.api[method](slug, config);
                return ultimateApi
                    .then(response => Promise.resolve(this.successHandler(response)))
                    .catch(error => Promise.reject(this.errorHandler(error)));
            };
        });
        this.refreshSubscribers = [];
        this.isFetchingAccessToken = false;
    }

    requestMiddleware(config) {
        if(config && !('Authorization' in config.headers)) {
            const { accessToken } = TokenService.getAccessToken();
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }

    responseErrorMiddleware(error) {
        // if(true) {//isTokenExpired
        //     return this.tryRefreshTokens(error);
        // }
        return Promise.reject(error);
    }

    successHandler(response) {
        return response.data.payload;
    }

    errorHandler(error) {
        switch (error.response.status) {
            case 401:
                break;
            case 422:
                if(error.response.data.type === 'ValidationError') {
                    throw new ValidationError(error.response.data.error.fields);
                }
                break;
            default:
                throw new UnknownError();
        }
    }

    async tryRefreshTokens(error) {
        try {
            const refreshToken = TokenService.getRefreshToken();
            if (!refreshToken) {
                return Promise.reject(error);
            }
            const retryOriginalRequest = new Promise( resolve => {
               this.refreshSubscribers.push(accessToken => {
                   error.response.config.headers.Authorization = `Bearer ${accessToken}`;
                   resolve(axios(error.response.config));
               });
            });
            if (!this.isFetchingAccessToken) {
                this.isFetchingAccessToken = true;
                const tokens = await tokenRefreshEndpoint(refreshToken);
                TokenService.setTokens(tokens);
                this.isFetchingAccessToken = false;
                this.subscribers.forEach(callback => callback(tokens.access_token));
                this.subscribers = [];
            }
            return retryOriginalRequest
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const { publicRuntimeConfig: { backendAPI } } = getConfig();
export default new APIService(backendAPI);