import axios from 'axios'

const initState = {
  userList: []
}

const GET_USER_LIST = 'GET_USER_LIST'

// reducer

export default function chatuser(state=initState, action){
  switch (action.type) {
    case GET_USER_LIST:
      return {...state, userList: action.payload}
    default:
      return state
  }
}

// actions

function userList(data){
  return {type: GET_USER_LIST, payload: data}
}

export function getUserList(type){
  return dispatch => {
    axios.get(`/user/list?type=${type}`).then(res=>{
      console.log(res,"res");
      dispatch(userList(res.data.data))
    })
  }
}
