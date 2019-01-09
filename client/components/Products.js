import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Products = ({products}) => {
  return (
    <div>
      {products.map(product => {
        return (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.images[0]} />
              <h1>{product.name}</h1>
              <h3>{product.price}</h3>
              <h2>Rating: {product.rating}</h2>
            </Link>
            <table>
              <tr>
                <td>
                  <button>Add To Cart</button>
                </td>
              </tr>
            </table>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Products)
