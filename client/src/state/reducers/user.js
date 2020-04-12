import actionGenerator from '../../utils/actionGenerator';

const reducerName = 'user';

export const userActions = {
    signUp: actionGenerator(reducerName, 'signUp'),
    signIn: actionGenerator(reducerName, 'signIn'),
    signOut: actionGenerator(reducerName, 'signOut')
};

const initialState = {
    isSignUping: false,
    isSignIning: false,
    isSignOuting: false,
    id: null,
    email: null
};

export default (state=initialState, action) => {
    switch (action.type) {
        case userActions.signUp.start:
            return { ...state, isSignUping: true };
        case userActions.signUp.success:
            return { ...state, isSignUping: false };
        case userActions.signUp.failure:
            return { ...state, isSignUping: false };
        case userActions.signIn.start:
            return { ...state, isSignIning: true };
        case userActions.signIn.success:
            return { ...state, isSignIning: false };
        case userActions.signIn.failure:
            return { ...state, isSignIning: false };
        case userActions.signOut.start:
            return { ...state, isSignOuting: true };
        case userActions.signOut.success:
            return { ...state, isSignOuting: false };
        case userActions.signOut.failure:
            return { ...state, isSignOuting: false };

        default:
            return {...state};
    }
};

export function signUp(values, actions, callbacks) {
    return {
        type: userActions.signUp.self,
        values,
        actions,
        callbacks
    }
}
export function signUpStart() {
    return { type: userActions.signUp.start }
}
export function signUpSuccess() {
    return { type: userActions.signUp.success }
}
export function signUpFailure() {
    return { type: userActions.signUp.failure }
}
export function signIn(values, actions, callbacks) {
    return {
        type: userActions.signIn.self,
        values,
        actions,
        callbacks
    }
}
export function signInStart() {
    return { type: userActions.signIn.start }
}
export function signInSuccess() {
    return { type: userActions.signIn.success }
}
export function signInFailure() {
    return { type: userActions.signIn.failure }
}
export function signOut() {
    return { type: userActions.signOut.self }
}
export function signOutStart() {
    return { type: userActions.signOut.start }
}
export function signOutSuccess() {
    return { type: userActions.signOut.success }
}
export function signOutFailure() {
    return { type: userActions.signOut.failure }
}