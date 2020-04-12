import React from 'react';
import styled from 'styled-components';
import SignInForm from '../containers/forms/SignInForm';
import FullscreenLayout from '../containers/layouts/FullscreenLayout';

const Page = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 50px;
`;

const SignInPage = props => (
    <FullscreenLayout>
        <Page>
            <SignInForm/>
        </Page>
    </FullscreenLayout>
);

export default SignInPage;

