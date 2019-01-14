import React from 'react';
import {Link} from 'react-router-dom';

const ProductLine = props => {
  const {product, deleteProductFromCart, updateProductQuantity} = props;
  return (
    <div className="current-order-line">
      <div className="ui items">
        <div className="item">
          <div className="ui tiny image">
            <img src={`/images/${product.imageUrl}`} />
          </div>
          <div className="middle aligned content">
            <Link className="header" to={`/products/${product.id}`}>
              {product.name}
            </Link>
          </div>
          <div>
            <input
              className="quantity-box"
              type="number"
              id="quantity"
              name="quantity"
              max="10"
              value={product.order_product.quantity}
              onChange={updateProductQuantity}
            />
          </div>
          <div className="description">{product.price / 100}</div>
          <div>
            <button
              className="mini ui red button"
              type="submit"
              onClick={() => deleteProductFromCart(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLine;
