import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AllOrder from './AllOrders';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props;

  return (
    <div id="user-profile">
      <h3>Welcome, {email}</h3>
      <h4>Your previous orders</h4>
      <AllOrders />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};