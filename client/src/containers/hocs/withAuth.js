import React, { useEffect } from 'react';
import AuthService from '../../services/AuthService';
import RoutingService from '../../services/RoutingService';

const withAuth = ({ isRedirect=true, redirectPath='/signin' }={}) => Page => {
    const Wrapper = props => {
        const synchronousSignOut = event => {
            if(event.key === 'signOut') {
                RoutingService.redirectTo(redirectPath);
            }
        };
        useEffect(() => {
            if(!props.isAuthenticated) {
                AuthService.onSignOut();
            }
        }, []);
        useEffect(() => {
            window.addEventListener('storage', synchronousSignOut);
            return () => {
                window.removeEventListener('storage', synchronousSignOut);
                window.localStorage.removeItem('signOut');
            };
        }, []);
        return <Page {...props}/>
    };
    Wrapper.getInitialProps = async ctx => {
        const { isAuthenticated } = await AuthService.checkAuthentication(ctx);
        if(!isAuthenticated && isRedirect) {
            RoutingService.redirectTo(redirectPath, ctx);
        }
        const pageProps = Page.getInitialProps && await Page.getInitialProps(ctx);
        return {
            ...pageProps,
            isAuthenticated
        };
    };
    return Wrapper;
};

export default withAuth;