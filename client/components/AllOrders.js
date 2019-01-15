import React from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../store';
import OrderItem from './OrderItem';

class AllOrders extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.user.id);
  }

  render() {
    const {orders} = this.props.user;
    return (
      <div id="all-orders">
        {orders.map(order => <OrderItem order={order} key={order.id} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
