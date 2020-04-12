import Router from 'next/router';

class RoutingService {
    static redirectTo(redirectPath, ctx) {
        if (!!ctx && typeof window === 'undefined') {
            ctx.res.writeHead(302, {Location: redirectPath});
            ctx.res.end();
        } else {
            Router.push(redirectPath)
        }
    }
}

export default RoutingService;