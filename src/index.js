import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/auth/feature';
// this is a higher order component
// we raped the 'Feature' component in the 'RequireAuth' component to check for authentication prior to rendering
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// we are updating our app there before it's rendered
// we always want the user to be signed in if they have a jwt token
// this way they can hit reload while logged in without getting logged out
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token')
// if we have a token, consider the user to be signed in
if (token) {
  store.dispatch({ type: 'AUTH_USER'} );
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="feature" component={RequireAuth(Feature)}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
