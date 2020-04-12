import React from 'react';
import styled, { css } from 'styled-components';
import DotsIndicator from '../indicators/DotsIndicator';

const disableMixin = css`
  box-shadow: 
    ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
    ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light},
    inset ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
    inset ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light}; 
`;
const Button = styled.button`
  position: relative;
  height: 50px;
  min-width: 200px;
  padding: 0 20px;
  background-color: ${props => props.theme.background.color.main};
  border: 3px solid ${props => props.theme.border.color.main};
  border-radius: ${props => props.theme.border.radius.standard};
  outline: none;
  box-shadow: 
    ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
    ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light};
  transition: box-shadow 200ms ease;
  &:active {
     box-shadow: 
        ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
        ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light},
        inset ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
        inset ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light}; 
  }
  ${props => props.disabled && disableMixin}
`;
const Label = styled.div`
  visibility: ${props => props.isProgressed ? 'hidden': 'visible'};
  font-family: ${props => props.theme.text.font.bold};
  font-size: ${props => props.isDisabled? `calc(${props.theme.text.size.big} - 2px)`: props.theme.text.size.big};
  color: ${props => props.theme.text.color.main};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: font-size 200ms ease;
  &:active {
    font-size: calc(${props => props.theme.text.size.big} - 2px);
  }
`;

const SuperButton = props => {
    return (
        <Button disabled={props.isDisabled}  type={props.type}>
            <Label isDisabled={props.isDisabled} isProgressed={props.isProgressed}>{props.label}</Label>
            <DotsIndicator isProgressed={props.isProgressed}/>
        </Button>
    );
};

export default SuperButton;