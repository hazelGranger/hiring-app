

export const add = () => ({
  type: "ADD"
})

export const remove = () => ({
  type: "REMOVE"
})

export const add1s = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 1000)
  }
}

export const remove1s = () => {
  return ( dispatch ) => {
    setTimeout(() =>{
      dispatch(remove())
    },1000)
  }
}

// auth
export const login = () => ({
  type: "LOGIN"
})

export const logout = () => ({
  type: "LOGOUT"
})
