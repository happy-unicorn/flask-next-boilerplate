import React, {Component} from 'react';
import styled from 'styled-components';

const Layout = styled.div``;

class ResponsiveGridLayout extends Component {
    render() {
        return (
            <Layout>{this.props.children}</Layout>
        );
    }
}

export default ResponsiveGridLayout;