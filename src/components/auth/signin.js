/**
 * Created by david on 6/25/17.
 */
// you are here 'adding sign in form'

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
class Signin extends Component {
  // {email, password} is es6 short-form here
  handleFormSubmit ({ email, password}) {
    console.log(email, password)
    // need to do something to log user in
  }

  render () {
    // handleSubmit is coming from redux-form
    // email and password also coming from redux-form but due to form setup below
    const {handleSubmit, fields: {email, password}} = this.props

    // onSubmit call the handleSubmit helper from reduxForm with the our callback handleFormSubmit which gives the finalized form properties.
    // we need to bind when using a callback
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" className="form-control"/>
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin)
