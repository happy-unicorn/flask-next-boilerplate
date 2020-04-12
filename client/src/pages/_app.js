import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../state/store';
import compose from '../utils/compose';
import StoreProvider from '../containers/providers/StoreProvider';
import StyleProvider from '../containers/providers/StyleProvider';

const App = ({ Component, pageProps, store }) => (
    <StoreProvider store={store}>
        <StyleProvider>
            <Component {...pageProps} />
        </StyleProvider>
    </StoreProvider>
);

App.getInitialProps = async ({Component, ctx}) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx): {};
    return { pageProps };
};

export default compose(
    withRedux(createStore),
    withReduxSaga
)(App);