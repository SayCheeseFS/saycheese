import React from 'react';
import {connect} from 'react-redux';
import {setCart, setProductOnCart, updateProductQuantity} from '../store';
import LineItem from './LineItem';
import StripeBtn from './StripeBtn';

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.setCart();
  }
  render() {
    const cart = this.props.cart;
    console.log(cart);
    if (!cart) return null;
    let total = 0;
    return (
      <div className="ui segment centered">
        <div id="current-order">
          <h2>Your cart</h2>
          {cart.products.map(product => {
            total += product.price * product.order_product.quantity;
            return (
              <LineItem
                key={product.id}
                product={product}
                deleteProductFromCart={this.props.deleteProductFromCart}
                updateProductQuantity={e =>
                  this.props.updateProductQuantity(product.id, e.target.value)
                }
              />
            );
          })}
          <h2>Total: ${total / 100}</h2>
          <div>
            <StripeBtn total={total} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartObj.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCart: () => {
      dispatch(setCart());
    },
    deleteProductFromCart: id => {
      dispatch(setProductOnCart(id));
    },
    updateProductQuantity: (productId, quantity) => {
      dispatch(updateProductQuantity(productId, quantity));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
