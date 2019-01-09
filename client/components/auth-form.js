import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">{displayName} to your account</div>
        </h2>
        <form className="ui large form" onSubmit={handleSubmit} name={name}>
          <div className="ui stacked secondary segment">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <div className="field">
              <input name="email" type="text" />
            </div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <div className="field">
              <input name="password" type="password" />
            </div>
            <button className="ui field fluid teal submit button" type="submit">
              {displayName}
            </button>
            {error &&
              error.response && (
                <div className="ui error message"> {error.response.data} </div>
              )}
          </div>
        </form>
        <div className="ui message">
          <a className="ui google plus button" href="/auth/google">
            <i className="google icon" />
            {displayName} with Google
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
