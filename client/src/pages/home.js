import React from 'react';
import FullscreenLayout from '../containers/layouts/FullscreenLayout';
import ResponsiveGridLayout from '../containers/layouts/ResponsiveGridLayout';
import ProductsGrid from '../containers/grids/ProductsGrid';
import withAuth from '../containers/hocs/withAuth';
import compose from '../utils/compose';

const Home = (props) => {
    return (
        <FullscreenLayout>
            <ResponsiveGridLayout>
                <ProductsGrid/>
            </ResponsiveGridLayout>
        </FullscreenLayout>
    );
};

Home.getInitialProps = () => {
    return {};
};

export default compose(
    // withAuth()
)(Home);