import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import styled from 'styled-components';
import RoutingService from '../../services/RoutingService';
import compose from '../../utils/compose';
import InputField from '../../components/fields/InputField';
import SubmitButton from '../../components/buttons/SuperButton';
import { signIn } from '../../state/reducers/user';
import addProductSchema from './schemas/addProductSchema';

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

class AddProductForm extends Component {
    render() {
        return(
            <Formik
                initialValues={{ title: '', description: '' }}
                validationSchema={addProductSchema}
                onSubmit={this.props.onSubmit}
            >
                {props => (
                    <Form onSubmit={props.handleSubmit} noValidate>
                        <InputField type={'text'} name={'title'} placeholder={'Title'}/>
                        <InputField type={'text'} name={'description'} placeholder={'Description'}/>
                        <SubmitButton
                            type={'submit'}
                            label={'Add product'}
                            isProgressed={this.props.isSignIning}
                            isDisabled={this.props.isSignIning}
                        />
                    </Form>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = state => ({
    isSignIning: state.user.isSignIning
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (values, actions) => {
        const callbacks = {
            onSuccess: () => {
                RoutingService.redirectTo('/home');
            }
        };
        dispatch(signIn(values, actions, callbacks));
    }
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AddProductForm);