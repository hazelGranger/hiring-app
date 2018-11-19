import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')


// get message list
const MSG_LIST = 'MSG_LIST'

// receive messages
const MSG_RECV = 'MSG_RECV'

// read messages
const MSG_READ = 'MSG_READ'


const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

// reducer
export default function chat(state=initState, action){
  switch (action.type) {
    case MSG_LIST:
      const userId = action.payload.userId
      return {...state, chatmsg: action.payload.msgs, users: action.payload.users, unread: action.payload.msgs.filter(m=>!m.read&&m.to===userId).length}
    case MSG_RECV:
      const num = action.userId === action.payload.to?1:0
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread+num}
    //
    // case MSG_READ:
    default:
      return state

  }
}

// actions
function msgList(msgs, users, userId){
  return {type: MSG_LIST, payload: { msgs, users, userId } }
}

export function getMsgList(){
  return (dispatch, getState)=>{
    axios.get('/user/getmsglist').then(res =>{
      if (res.status === 200 && res.data.code === 0) {
        console.log(res.data.msgs, 'getMsgList');
        dispatch(msgList(res.data.msgs, res.data.users, getState().user._id))
      }
    })
  }
}

export function sendMsg({from ,to ,msg}){
  return dispatch=>{
    socket.emit('sendMsg',{from ,to ,msg})
  }
}

function msgRecv(msg, userId) {
  return {type: MSG_RECV, payload: msg, userId }
}

export function receiveMsg(){
  return (dispatch, getState)=>{
    socket.on('receiveMsg', (data)=>{
      console.log(data, 'receiveMsg');
      dispatch(msgRecv(data, getState().user._id))
    })
  }
}
