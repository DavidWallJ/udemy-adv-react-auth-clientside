/**
 * Created by david on 6/27/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'

const validate = (formProps) => {
  // console.log(formProps);
  const errors = {}

  const signupFields = ['email', 'password', 'confirmPassword']

  signupFields.forEach(function (field) {
    if (!formProps[field]) {
      errors[field] = `Please enter field content`
    }
  })

  if (formProps.password !== formProps.confirmPassword) {
    errors.password = 'Passwords must match'
  }

  return errors
}

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <fieldset className="form-group">
    <label>{label}</label>
    <input className="form-control" {...input} placeholder={label} type={type}/>
    {touched && error && <span className="error">{error}</span>}
  </fieldset>
)

class Signup extends Component  {
  handleFormSubmit(formProps){
    // call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field name="email" type="email" component={renderField} label="Email:" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" type="password" component={renderField} label="Password:" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="confirmPassword" type="password" component={renderField} label="Confirm Password:"
                 className="form-control"/>
        </fieldset>
        { this.renderAlert() }
        <button type="submit" disabled={submitting}>Sign Up</button>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

const form = reduxForm({form: 'signup', validate})(Signup)
export default connect(mapStateToProps, actions)(form)