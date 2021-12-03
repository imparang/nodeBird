// 서버사이드렌더링을 위해서
import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import post from './post'



// async action creator -> redux-saga
// action creator

// (이전상태, 액션) => 다음 상태
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch(action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload
        }
      default:
        return state
    }
  },
  user,
  post
})

export default rootReducer
