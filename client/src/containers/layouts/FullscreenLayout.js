import React, {Component} from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  min-height: 100vh;
  min-width: 100%;
  background-color: ${props => props.theme.background.color.main};
`;

class FullscreenLayout extends Component {
    render() {
        return (
            <Layout>{this.props.children}</Layout>
        );
    }
}

export default FullscreenLayout;