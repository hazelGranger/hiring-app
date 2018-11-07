const auth = (state={username: 'test', isAuth: false}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, isAuth: true}
    case "LOGOUT":
      return {...state, isAuth: false}
    default:
      return state
  }
}

export default auth;
