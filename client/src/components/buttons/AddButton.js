import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const AddButton = props => {
    return (
        <div onClick={props.onClick}>
            <FaPlus size={50}/>
        </div>
    )
};

export default AddButton;
