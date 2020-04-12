import APIService from '../../services/APIService';
import { userActions } from '../reducers/user';

const userMiddleware = store => next => async action => {
    // if(action.type === userActions.signUp.self || action.type === userActions.signIn.self) {
    //     // console.log(await getFingerprint());
    //     console.log(action);
    // }
    // if (action.type === userActions.signUp.success || action.type === userActions.signIn.success) {
    //     APIService.setAccessToken(action.data.access_token);
    // }
    next(action);
};

export default userMiddleware;