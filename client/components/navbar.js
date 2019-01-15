import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({handleClick, isLoggedIn, cart, user}) => {
  return (
    <div className="ui menu">
      <Link to="/products" className="header item">
        <i className="middle aligned big camera retro icon" />
        SayCheese
      </Link>
      <div className="right menu">
        {/* The navbar will show these links after you log in */}
        <Link to="/cart" className="item">
          <div>
            <i className="ui large middle aligned shopping cart icon" />
            {cart.products &&
              cart.products.length > 0 && (
                <a className="ui mini red circular label">
                  {cart.products.length}
                </a>
              )}
          </div>
        </Link>
        {isLoggedIn ? (
          <div className="right menu">
            <Link to={`/users/${user.id}`} className="header item">
              <i className="middle aligned user circle icon" />
            </Link>
            <Link to="/#" className="item" onClick={handleClick}>
              <div>Logout</div>
            </Link>
          </div>
        ) : (
          <div className="right menu">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="item">
              <div>Login</div>
            </Link>
            <Link to="/signup" className="item">
              <div>SignUp</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.email,
    cart: state.cartObj.cart,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
