import React from 'react';
import styled, { keyframes } from 'styled-components';

const dotShadowKeyframe = props => keyframes`
  0% {
    box-shadow: none;
  }
  100% {
    box-shadow: 
        ${props.theme.shadow.direction.positive} ${props.theme.shadow.color.dark}, 
        ${props.theme.shadow.direction.negative} ${props.theme.shadow.color.light};
  }
`;
const dotBackgroundKeyframe = props => keyframes`
  0% {
    background-color: ${props.theme.indicator.color.standard};
  }
  50% {
    background-color: ${props.theme.indicator.color.standard};  
  }
  100% {
    background-color: ${props.theme.indicator.color.active};
  }
`;
const Indicator = styled.div`
  display: ${props => props.isProgressed ? 'flex': 'none'};
  position: absolute;
  justify-content: space-between;
  top: calc(50% - 7.5px);
  left: calc(50% - 40px);
  width: 80px;
`;
const Dot = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  animation-duration: 500ms; 
  animation-iteration-count: infinite;
  animation-direction: alternate;
  &:nth-child(1) {
    animation-name: ${dotShadowKeyframe}, ${dotBackgroundKeyframe};
  }
  &:nth-child(2) {
    animation-name: ${dotShadowKeyframe}, ${dotBackgroundKeyframe};
    animation-delay: 150ms;
  }
  &:nth-child(3) {
    animation-name: ${dotShadowKeyframe}, ${dotBackgroundKeyframe};
    animation-delay: 300ms;
  }
`;

const DotsIndicator = props => (
    <Indicator isProgressed={props.isProgressed}>
        <Dot/>
        <Dot/>
        <Dot/>
    </Indicator>
);

export default DotsIndicator;