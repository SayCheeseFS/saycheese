import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <div className="ui card align centered">
          <div className="content">
            <div className="header">
              <h2>Thank You.</h2>
            </div>
          </div>
          <div className="content">
            <h2 className="ui sub header">Your Order Has Been Placed :)</h2>
          </div>
          <div className="extra content">
            <Link to="/">
              <button className="ui button">Continue Shopping</button>
            </Link>
          </div>
        </div>
        <div className="ui align centered">
          <Link to={`/users/${this.props.user.id}`}>
            <p>view previous orders</p>
          </Link>
        </div>
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
