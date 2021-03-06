
import axios from 'axios';
// browserHistory allows react-redux to read the url and make changes to it
import { browserHistory } from 'react-router';
// backend should be running 'Projects/udemy-adv-react-auth-pro'
const ROOT_URL ='http://localhost:3000';

export function signinUser({ email, password }) {
  // we can only return a function here because of redux-thunk
  // we can now do whatever we want within this function and then return dispatch with our usual action format
  return function(dispatch){
    // submit email/password to the server
    // using es6 syntax for email/password object
    // remember axios returns a promise
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // if request is good
        // update state to indicate user is authenticated
        dispatch({ type: 'AUTH_USER' });
        // save the jwt token
        // localStorage is native to your browser
        localStorage.setItem('token', response.data.token);
        // redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // if request is bad, show an error to user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: 'AUTH_USER' });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
      });
  }
}

export function authError(error) {
  
  return {
    type: 'AUTH_ERROR',
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: 'UNAUTH_USER'
  };
}

export function fetchMessage() {
  return function(dispatch) {
    // the backend requires the token to allow an interaction at this URL
    // it requires the 'token' on the header
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: 'FETCH_MESSAGE',
          payload: response.data.message
        })
      })
  }
}