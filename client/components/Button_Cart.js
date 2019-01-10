import React from 'react'

/**
 * COMPONENT
 */
const ButtonCart = props => {
  const {productId, addProduct} = props

  return (
    <div className="checkout-button-container">
      <button
        className="ui button"
        type="submit"
        onClick={() => {
          addProduct(productId)
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ButtonCart
