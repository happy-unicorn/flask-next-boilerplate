import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import styled from 'styled-components';
import RoutingService from '../../services/RoutingService';
import { signUp } from '../../state/reducers/user';
import compose from '../../utils/compose';
import InputField from '../../components/fields/InputField';
import SubmitButton from '../../components/buttons/SuperButton';
import Logo from '../../components/Logo';
import signUpSchema from './schemas/signUpSchema';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  align-items: center;
  justify-content: center;
  max-width: 550px;
  padding: 40px 0;
  border-radius: ${props => props.theme.border.radius.standard};
  background-color: ${props => props.theme.background.color.main};
  box-shadow: 
    ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
    ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light};
  & > div {
    width: 80%;
    padding: 0 40px;
  }
  & > button {
    width: 50%;
  }
  & > span {
    margin-bottom: 30px;
  }
`;

class SignUpForm extends Component {
    render() {
        return(
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                validationSchema={signUpSchema}
                onSubmit={this.props.onSubmit}
            >
                {props => (
                    <Form onSubmit={props.handleSubmit} noValidate>
                        <Logo/>
                        <InputField type={'email'} name={'email'} placeholder={'Email'}/>
                        <InputField type={'text'} name={'username'} placeholder={'Username'}/>
                        <InputField type={'password'} name={'password'} placeholder={'Password'}/>
                        <SubmitButton
                            type={'submit'}
                            label={'Sign Up'}
                            isProgressed={this.props.isSignUping}
                            isDisabled={this.props.isSignUping}
                        />
                    </Form>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = state => ({
    isSignUping: state.user.isSignUping
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (values, actions) => {
        const callbacks = {
            onSuccess: () => {
                RoutingService.redirectTo('/home');
            }
        };
        dispatch(signUp(values, actions, callbacks));
    }
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(SignUpForm);