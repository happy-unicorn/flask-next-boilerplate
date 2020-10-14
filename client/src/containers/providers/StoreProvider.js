import React from 'react';
import { Provider } from 'react-redux';

const StoreProvider = (props) => {
    return (
        <Provider store={props.store}>
            {props.children}
        </Provider>
    );
};

export default StoreProvider;