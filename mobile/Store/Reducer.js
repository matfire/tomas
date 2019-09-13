import firebase from '../Components/Firebase'

const initialState = { auth: false, messages: [], firebase }


function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'LOGIN':
            nextState = {
                ...state,
                auth: true,
            }
      return nextState || state
    case 'LOGOUT':
        nextState = {
            ...state,
            auth: false,
        }
      return nextState || state
    case "SET_MESSAGES":
        nextState = {
          ...state,
          messages:action.payload
        }
  default:
    return state
  }
}

export default toggleFavorite