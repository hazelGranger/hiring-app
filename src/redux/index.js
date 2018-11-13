import { combineReducers } from 'redux'

import user from './user.redux.js'
import chatuser from './chatuser.redux.js'

export default combineReducers({
  user,
  chatuser
})
