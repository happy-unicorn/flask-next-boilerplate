import React from 'react';
import styled from 'styled-components';

const Preview = styled.div``;
const Title = styled.div``;
const Description = styled.div``;

const ProductPreview = props => {
    return (
        <Preview>
            <Title>
                {props.title}
            </Title>
            <Description>
                {props.description}
            </Description>
        </Preview>
    )
};

export default ProductPreview;