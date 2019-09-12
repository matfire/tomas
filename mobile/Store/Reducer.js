const initialState = { auth: false }

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
  default:
    return state
  }
}

export default toggleFavorite