import React from 'react';
import {Link} from 'react-router-dom';

const OrderItem = props => {
  const {order} = props;
  return (
    <div className="ui items">
      <div className="item">
        <div className="content">
          Order number #{order.id}
          <div className="meta">
            <span className="number">Placed on {order.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
