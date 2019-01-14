import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleProduct, setProductToCart} from '../store';
import ButtonCart from './Button_Cart';

class Product extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }
  render() {
    const product = this.props.product;
    return (
      <div>
        <img src={`/images/${product.imageUrl}`} />
        <h1>{product.name}</h1>
        <h3>{product.price}</h3>
        <h4>{product.description}</h4>
        <h4>Rating: {product.rating}</h4>
        <h4>In Stock</h4>
        <ButtonCart
          productId={product.id}
          addProduct={this.props.setProductToCart}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({product: state.inventory.product});
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => {
      dispatch(fetchSingleProduct(id));
    },
    setProductToCart: productId => dispatch(setProductToCart(productId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
