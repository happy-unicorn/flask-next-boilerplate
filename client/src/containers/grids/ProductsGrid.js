import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProductPreview from '../../components/product/ProductPreview';
import AddButton from '../../components/buttons/AddButton';
import AddProductModal from '../modals/AddProductModal';
import DeleteProductModal from "../modals/DeleteProductModal";
import compose from '../../utils/compose';

const Grid = styled.div`

`;
const ProductsContainer = styled.div``;
const ButtonContainer = styled.div``;

class ProductsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddOpen: false,
            isDeleteOpen: false
        };
    }

    onOpenAddModal = () => {
        this.setState({ isAddOpen: true });
    };

    onCloseAddModal = () => {
        this.setState({ isOpen: false });
    };

    render() {
        console.log(this.state);
        return(
            <Grid>
                <ProductsContainer>
                    {this.props.products.map(({title, description}) => {
                        return (
                            <ProductPreview
                                title={title}
                                description={description}
                            />
                        );
                    })}
                </ProductsContainer>
                <ButtonContainer>
                    <AddButton
                        onClick={this.onOpenAddModal}
                    />
                </ButtonContainer>
                <AddProductModal
                    isOpen={this.state.isAddOpen}
                    onClose={this.onCloseAddModal}
                />
                <DeleteProductModal
                    isOpen={this.state.isDeleteOpen}
                    onClose={this.onCloseAddModal}
                />
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    products: [
        {
            title: "Title",
            description: "Description"
        },
        {
            title: "Title",
            description: "Description"
        },
        {
            title: "Title",
            description: "Description"
        },
    ]
});
// state.product
const mapDispatchToProps = dispatch => ({
    onDelete: () => {
        dispatch();
    }
});

export default compose(
    connect(mapStateToProps, mapStateToProps)
)(ProductsGrid);