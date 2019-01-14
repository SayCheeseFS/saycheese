import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllProducts} from '../store/product';
import ButtonCart from './Button_Cart';
import {setProductToCart} from '../store';

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    return (
      <div className="ui link cards">
        {this.props.products.map(product => {
          return (
            <div className="card" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className="ui image small">
                  <img src={`/images/${product.imageUrl}`} />
                </div>
                <div className="content">
                  <div className="ui header">{product.name}</div>
                  <div className="description">
                    Price: ${product.price / 100}
                  </div>
                </div>
              </Link>
              <div className="extra content">
                <ButtonCart
                  productId={product.id}
                  addProduct={this.props.setProductToCart}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({products: state.inventory.products});
const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    setProductToCart: productId => dispatch(setProductToCart(productId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
