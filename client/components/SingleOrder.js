import React from 'react'
import {connect} from 'react-redux'
import {setCart, deleteProductFromCart, updateProductQuantity} from '../store'
import ProductLine from './ProductLine'
import Products from './Products'

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.setCart()
  }
  render() {
    const cart = this.props.cart
    let total = 0
    return (
      <div id="current-order">
        <p>Your cart</p>
        {cart.products.map(product => {
          total += product.price / 100 * product.quantity
          return (
            <ProductLine
              key={product.id}
              product={product}
              deleteProductFromCart={this.props.deleteProductFromCart}
              updateProductQuantity={e =>
                this.props.updateProductQuantity({
                  productId: product.id,
                  quantity: e.target.value
                })
              }
            />
          )
        })}
        <p>Total: ${total}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartObj.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCart: () => {
      dispatch(setCart())
    },
    deleteProductFromCart: id => {
      dispatch(deleteProductFromCart(id))
    },
    updateProductQuantity: quantity => {
      dispatch(updateProductQuantity(quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
