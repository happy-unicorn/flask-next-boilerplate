import React from 'react';
import styled from 'styled-components';
import SignUpForm from '../containers/forms/SignUpForm';
import FullscreenLayout from '../containers/layouts/FullscreenLayout';

const Page = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 50px;
`;

const SignUpPage = props => (
    <FullscreenLayout>
        <Page>
            <SignUpForm/>
        </Page>
    </FullscreenLayout>
);

export default SignUpPage;