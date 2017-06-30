/**
 * Created by david on 6/30/17.
 */
export default function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_MESSAGE':
      return { ...state, message: action.payload}
  }

  return state
}