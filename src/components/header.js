/**
 * Created by david on 6/25/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Header extends Component {

  renderLinks () {
    if (this.props.authenticated) {
      // show a link to sign out
      // it's in an array so that we don't need to wrap it in a div
      return [
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ]

    } else {
      // show a link to sign in or sign up
      // because we are sending an array react thinks it's a list of components so it wants ust to add a key
      // but because these items are static we can just give them a static key to satisfy react
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }

  }

  render () {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)
