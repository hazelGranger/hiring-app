import axios from 'axios'

import { getRedirectPath } from '../utli'

// actions
const ERROR_MSG = 'ERROR_MSG'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const initalState = {
  username: '',
  password: '',
  type: '',
  isAuth: false,
  msg: '',
  redirectTo: ''
}

function errorMsg(msg){
  return { msg, type: ERROR_MSG }
}

function registerSuccess(data){
  return { type: REGISTER_SUCCESS, payload: data }
}

const loginSuccess = (data)=>({
  type: LOGIN_SUCCESS, payload: data
})

export function register({username, password, repeatPassword, type}){
  if (!username||!password||!type) {
    return errorMsg('username&password is required!')
  }
  if (password!==repeatPassword) {
    return errorMsg('two passwords should be same')
  }

  return (dispatch) =>{
    axios.post('/user/register',{username,password,type}).then(res=>{

      if (res.status===200&&res.data.code===0) {
        dispatch(registerSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}

export function login({username, password}) {
  if (!username||!password) {
    return errorMsg('username&password is required!')
  }
  return (dispatch) => {
    axios.post('/user/login', {username, password}).then(res=>{
      if (res.status===200&&res.data.code===0) {
        console.log(res.data);
        dispatch(loginSuccess(res.data.data))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}


// reducer
const user = (state=initalState, action) => {
  switch (action.type) {
    case ERROR_MSG:
      return {...state, msg: action.msg, isAuth: false}
    case REGISTER_SUCCESS:
      return {...state, ...action.payload, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload)}
    case LOGIN_SUCCESS:
      return {...state, ...action.payload, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload)}
    default:
      return state
  }
}

export default user
