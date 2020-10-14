import React, { Component } from 'react';
import styled from 'styled-components';
import AddProductForm from '../forms/AddProductForm';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

class DeleteProductModal extends Component {
    render() {
        return (
          <div>
              <Modal isOpen={this.props.isOpen}>
                  delete
              </Modal>
          </div>
        );
    }
}

export default DeleteProductModal;