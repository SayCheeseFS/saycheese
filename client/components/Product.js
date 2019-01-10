import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store'

class Product extends React.Component {
  componentDidMount() {
    // console.log(this.props, this.props.match)
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  render() {
    const product = this.props.product
    return (
      <div>
        <img src={`/images/${product.imageUrl}`} />
        <h1>{product.name}</h1>
        <h3>{product.price}</h3>
        <h4>{product.description}</h4>
        <h4>Rating: {product.rating}</h4>
        <h4>In Stock</h4>
        <button type="submit">Add To Cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({product: state.inventory.product})
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => {
      dispatch(fetchSingleProduct(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
