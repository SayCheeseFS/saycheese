import React from 'react';
import {Link} from 'react-router-dom';

class Confirmation extends React.Component {
  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h2>Your Order Has Been Placed!</h2>
        <Link to="/">
          <button>Continue Shopping</button>
        </Link>
      </div>
    );
  }
}

export default Confirmation;
