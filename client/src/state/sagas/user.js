import { takeLatest, put, call, delay } from 'redux-saga/effects';
import {
    userActions, 
    signUpStart,
    signUpSuccess,
    signUpFailure,
    signInStart,
    signInSuccess,
    signInFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure
} from '../reducers/user';
import {
    signUpEndpoint,
    signInEndpoint,
    signOutEndpoint
} from '../endpoints/user';
import ErrorService from '../../services/ErrorService';
import TokenService from '../../services/TokenService';
import getFingerprint from '../../utils/getFingerprint';

function* signUpSaga({ values, actions, callbacks }) {
    try {
        yield put(signUpStart());
        const device_fingerprint = yield call(getFingerprint);
        const tokens = yield call(signUpEndpoint, {...values, device_fingerprint});
        TokenService.setTokens(tokens);
        yield put(signUpSuccess());
        yield call(callbacks.onSuccess);
    } catch (error) {
        yield call(ErrorService.handleError, error, actions.setErrors);
        yield put(signUpFailure());
    }
}

function* signInSaga({ values, actions, callbacks }) {
    try {
        yield put(signInStart());
        const device_fingerprint = yield call(getFingerprint);
        const tokens = yield call(signInEndpoint, {...values, device_fingerprint});
        TokenService.setTokens(tokens);
        yield put(signInSuccess());
        yield call(callbacks.onSuccess)
    } catch (error) {
        yield call(ErrorService.handleError, error, actions.setErrors);
        yield put(signInFailure());
    }
}

function* signOutSaga() {
    try {
        yield put(signOutStart());
        const { refreshToken } = TokenService.getRefreshToken();
        yield call(signOutEndpoint, refreshToken);
        TokenService.revokeTokens();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure());
    }
}

export default [
    takeLatest(userActions.signUp.self, signUpSaga),
    takeLatest(userActions.signIn.self, signInSaga),
    takeLatest(userActions.signOut.self, signOutSaga)
];