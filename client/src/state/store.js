import getConfig from 'next/config';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import appReducer from './reducers/app';
import userReducer from './reducers/user';
import userSaga from './sagas/user';
import userMiddleware from "./middlewares/user";

const { publicRuntimeConfig } = getConfig();

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer
});

function* rootSaga() {
  yield all([...userSaga]);
}

const bindMiddleware = middleware => {
    if (publicRuntimeConfig.nodeEnv !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export default (initialState={}) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware, userMiddleware];
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware(middleware)
    );
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};