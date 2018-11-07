const auth = (state={username: 'test', isAuth: false}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, isAuth: true}
    case "LOGOUT":
      return {...state, isAuth: false}
    case "RENDER_USER_DATA":
      return {...state, username: action.payload.username,age: action.payload.age}
    default:
      return state
  }
}

export default auth;
