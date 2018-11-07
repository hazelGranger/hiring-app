import axios from 'axios'

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

export const renderUserData = (data) => ({
  type: "RENDER_USER_DATA",
  payload: data
})

export const getUserData = () => {
  return (dispatch) => {
    axios.get('/user').then(res => {
      if (res.status === 200) {
        dispatch(renderUserData(res.data))
      }
    })
  }
}
