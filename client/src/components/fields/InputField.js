import React, { useState } from 'react';
import { Field } from 'formik';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 88px;
  min-width: 250px;
`;
const InputWrapper = styled.div`
  position: relative;
  height: ${props => props.isError ? '76px': '56px'};
  width: 100%;
  border-radius: ${props => props.theme.border.radius.standard};
  background-color: ${props => props.theme.background.color.main};
  box-shadow: 
     ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
     ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light};
   transition: height 150ms linear;
`;
const InputInner = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 3px solid ${props => props.theme.border.color.main};
  border-radius: ${props => props.theme.border.radius.standard};
  background-color: ${props => props.theme.background.color.main};
  box-shadow:
     inset ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
     inset ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light}
     ${props => props.isError && `, inset ${props.theme.shadow.direction.straight} ${props.theme.shadow.color.error}`};
  z-index: 2;   
`;
const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  padding-top: ${props => props.isPlaceholder ? '12px': '3px'};
  margin: 0 12px;
  border: none;
  background-color: transparent;
  font-family: ${props => props.theme.text.font.regular};
  font-size: ${props => props.theme.text.size.small};
  color: ${props => props.theme.text.color.main};
  outline: none;
  &::placeholder {
    font-family: ${props => props.theme.text.font.regular};
    color: ${props => props.theme.text.color.placeholder};
  }
`;
const Placeholder = styled.div`
  position: absolute;
  width: calc(100% - 40px);
  padding: 8px 20px 0 20px;
  font-family: ${props => props.theme.text.font.regular};
  font-size: ${props => props.theme.text.size.smaller};
  color: ${props => props.theme.text.color.placeholder};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  z-index: 3;
`;
const Error = styled.div`
  padding: 1px 20px 0 20px;
  font-family: ${props => props.theme.text.font.regular};
  font-size: ${props => props.theme.text.size.small};
  color: ${props => props.theme.text.color.error};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform: translateY(${props => props.isError ? '0':'-20px'});
  transition: transform 150ms linear;
  z-index: 1;
`;

const Component = ({field, form, ...props}) => {
    const [focusState, setFocusState] = useState(false);
    const isPlaceholder = !!(field.value || focusState);
    const isError = !!(form.touched[field.name] && form.errors[field.name]);
    return (
        <Wrapper>
            <InputWrapper isError={isError}>
                {isPlaceholder && <Placeholder>{props.placeholder}</Placeholder>}
                <InputInner isError={isError}>
                    <Input
                        isPlaceholder={isPlaceholder}
                        autoComplete={'off'}
                        spellCheck={'false'}
                        {...field}
                        {...props}
                        placeholder={isPlaceholder ? '': props.placeholder}
                        onFocus={() => {
                            setFocusState(prevFocusState => !prevFocusState);
                        }}
                        onBlur={(event) => {
                            field.onBlur(event);
                            setFocusState(prevFocusState => !prevFocusState);
                        }}
                    />
                </InputInner>
                <Error isError={isError}>{form.errors[field.name]}</Error>
            </InputWrapper>
        </Wrapper>
    );
};

const InputField = (props) => {
    return(
        <Field {...props} component={Component}/>
    );
};

export default InputField;