/**
 * Created by david on 6/26/17.
 */
export default function (state = {}, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return {...state, error: '', authenticated: true };
    case 'UNAUTH_USER':
      return { ...state, error: '', authenticated: false };
    case 'AUTH_ERROR':
      return { ...state, error: action.payload };
  }

  return state
}

// we can set error to '' for 2 of the 3 cases above because all errors are being handled by 'AUTH_ERROR'