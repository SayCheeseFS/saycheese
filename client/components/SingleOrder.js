import React from 'react'
import {connect} from 'react-redux'
import {setCart, setProductOnCart, updateProductQuantity} from '../store'
import ProductLine from './ProductLine'
import StripeBtn from './StripeBtn'


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
      <div id="current-order">
        <p>Your cart</p>
        {cart.products.map(product => {
          total += product.price * product.order_product.quantity;
          return (
            <ProductLine
              key={product.id}
              product={product}
              deleteProductFromCart={this.props.deleteProductFromCart}
              updateProductQuantity={e =>
                this.props.updateProductQuantity(product.id, e.target.value)
              }
            />
          );
        })}
        <p>Total: ${total / 100}</p>
        <div>
          <StripeBtn total={total} />
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
