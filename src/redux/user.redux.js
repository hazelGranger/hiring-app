import axios from 'axios'

import { getRedirectPath } from '../utli'

// actions
const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_USERINFO = 'LOAD_USERINFO'
const LOGOUT = 'LOGOUT'

const initalState = {
  username: '',
  password: '',
  type: '',
  isAuth: false,
  msg: '',
  redirectTo: '',
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

const authSuccess = (userinfo) => {
  const { password, ...data } = userinfo
  return { type: AUTH_SUCCESS, payload: data }
}

export const loadUserInfo = (data) =>({
  type: LOAD_USERINFO, payload: data
})

export function register({ username, password, repeatPassword, type }) {
  if (!username || !password || !type) {
    return errorMsg('username&password is required!')
  }
  if (password !== repeatPassword) {
    return errorMsg('two passwords should be same')
  }

  return (dispatch) =>{
    axios.post('/user/register', { username, password, type }).then(res => {

      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login({ username, password }) {
  if (!username || !password) {
    return errorMsg('username&password is required!')
  }
  return (dispatch) => {
    axios.post('/user/login', { username, password }).then(res=>{
      if (res.status === 200 && res.data.code === 0) {
        console.log(res.data)
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function logout(){
  return { type: LOGOUT }
}

export function updateInfo(userinfo) {
  return dispatch => {
    axios.post('/user/update', userinfo).then(res=>{
      if (res.status===200&&res.data.code===0) {
        dispatch(authSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}


// reducer
const user = (state=initalState, action) => {
  console.log(action.type, "action")
  switch (action.type) {
    case ERROR_MSG:
      return {...state, msg: action.msg, isAuth: false}
    case AUTH_SUCCESS:
      return {...state, ...action.payload, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload)}
    case LOAD_USERINFO:
      return {...state, ...action.payload}
    case LOGOUT:
      return {...initalState, redirectTo: '/login'}
    default:
      return state
  }
}

export default user
