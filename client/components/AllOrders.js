import React from 'react';
import {connect} from 'react-redux';
import {fetchOrders} from '../store';
import OrderItem from './OrderItem';

class AllOrders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.user.id);
  }

  render() {
    const {orders} = this.props;
    console.log(this.props);
    return (
      <div id="all-orders">
        {orders.map(order => <OrderItem order={order} key={order.id} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: userId => dispatch(fetchOrders(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
