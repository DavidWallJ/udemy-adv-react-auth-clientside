/**
 * Created by david on 6/25/17.
 */
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
class Signin extends Component {
  // {email, password} is es6 short-form here
  handleFormSubmit = ({ email, password}) => {
    console.log(email, password)
    // need to do something to log user in
    this.props.signinUser({ email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }
  render () {
    // handleSubmit is coming from redux-form
    // email and password also coming from redux-form but due to form setup below
    const { handleSubmit } = this.props

    // onSubmit call the handleSubmit helper from reduxForm with the our callback handleFormSubmit which gives the finalized form properties.
    // we need to bind when using a callback
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" type="password" component="input" className="form-control"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// different way of doing this this this time
// troubleshooting solution found in student comments
const form = reduxForm({ form: 'signin' })(Signin)
export default connect(mapStateToProps, actions)(form)
