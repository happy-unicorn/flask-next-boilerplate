import React from 'react';
import styled from 'styled-components';
import { AiOutlineShopping } from 'react-icons/ai';

const Wrapper = styled.span`
  border-radius: ${props => props.theme.border.radius.standard};
  background-color: ${props => props.theme.background.color.main};
  box-shadow: 
    ${props => props.theme.shadow.direction.positive} ${props => props.theme.shadow.color.dark}, 
    ${props => props.theme.shadow.direction.negative} ${props => props.theme.shadow.color.light};
`;
const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
`;
const Icon = styled(AiOutlineShopping)`
  color: ${props => props.theme.text.color.main};
`;

const Logo = (props) => (
    <Wrapper>
        <Inner>
            <Icon size={'40px'} />
        </Inner>
    </Wrapper>
);

export default Logo;
