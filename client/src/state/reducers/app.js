import actionGenerator from '../../utils/actionGenerator';

const reducerName = 'app';

export const appActions = {
    switchTheme: actionGenerator(reducerName, 'switchTheme', ['self']),
};

const initialState = {
    theme: 'light'
};

export default (state=initialState, action) => {
    switch (action.type) {
        case appActions.switchTheme.self:
            return {
                ...state,
                theme: action.theme
            };
        default:
            return {...state};
    }
};

export function switchTheme (theme) {
    return {
        type: appActions.switchTheme.self,
        theme
    }
}