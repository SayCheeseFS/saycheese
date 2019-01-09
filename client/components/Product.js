import React from 'react'
import {connect} from 'react-redux'

const Product = ({product}) => {
  return (
    <div>
      <img src={product.images[0]} />
      <h1>{product.name}</h1>
      <h3>{product.price}</h3>
      <h4>{product.description}</h4>
      <h4>Rating: {product.rating}</h4>
      <h4>In Stock</h4>
      <table>
        <tr>
          <td>
            <button>Add To Cart</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

const mapStateToProps = ({product}) => ({product})

export default connect(mapStateToProps, null)(Product)
