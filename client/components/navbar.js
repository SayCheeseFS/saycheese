import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="ui menu">
    <h3>Say Cheese</h3>
    {isLoggedIn ? (
      <div className="right menu">
        {/* The navbar will show these links after you log in */}
        <Link to="/home">Home</Link>
        <div href="#" className="item" onClick={handleClick}>
          Logout
        </div>
      </div>
    ) : (
      <div className="right menu">
        {/* The navbar will show these links before you log in */}
        <Link to="/login">
          <div className="item">Login</div>
        </Link>
        <Link to="/signup">
          <div className="item">SignUp</div>
        </Link>
      </div>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
