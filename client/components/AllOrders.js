import React from 'react';
import {connect} from 'react-redux';
import {fetchOrders} from '../store';
import OrderItem from './OrderItem';

class AllOrders extends React.Component {
  componentDidMount() {
    console.log('component did mount');
    console.log(this.props);
    this.props.fetchOrders(this.props.user.id);
  }

  render() {
    const orders = this.props.orders;
    console.log(orders);
    return (
      <div id="all-orders">
        {orders.map(order => <OrderItem order={order} key={order.id} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('in map state', state.user);
  return {
    orders: state.orderObj.orders,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: userId => dispatch(fetchOrders(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
