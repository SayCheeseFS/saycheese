import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Confirmation extends React.Component {
  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h2>Your Order Has Been Placed!</h2>
        <Link to="/">
          <button type="submit">Continue Shopping</button>
        </Link>
        <Link to={`/users/${user.id}`}>
          <p>Go to profile page</p>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps, null)(Confirmation);
