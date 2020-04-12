import React from 'react';
import withAuth from '../containers/hocs/withAuth';
import compose from '../utils/compose';

const Home = (props) => {
    return (
        <div>
            Home Page
        </div>
    );
};

Home.getInitialProps = () => {
    return {};
};

export default compose(
    withAuth()
)(Home);