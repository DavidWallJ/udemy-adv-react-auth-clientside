/**
 * Created by david on 6/27/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

const validate = formProps => {
  // console.log(formProps);
  const errors = {}

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

const Signup = (props) => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <form>
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
      <button type="submit" disabled={submitting}>Sign Up</button>
    </form>
  )

}

const form = reduxForm({form: 'signup', validate})(Signup)
export default connect(null, actions)(form)