import produce from 'immer'
import {
  ADD_POST_TO_ME,
  CHANGE_NICNKNAME_FAILURE,
  CHANGE_NICNKNAME_REQUEST,
  CHANGE_NICNKNAME_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_POST_OF_ME,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from './types'

export const loginRequestAction = data => {
  return {
    type: LOG_IN_REQUEST,
    data
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST
  }
}

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {}
}

const dummyUser = data => ({
  ...data,
  nickname: 'noze',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: 'aiki' },
    { nickname: 'leejung' },
    { nickname: 'IU' }
  ],
  Followers: [{ nickname: 'aiki' }, { nickname: 'leejung' }, { nickname: 'IU' }]
})

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true
        draft.logInDone = false
        draft.logInError = null
        break
      case LOG_IN_SUCCESS:
        draft.logInLoading = false
        draft.logInDone = true
        draft.me = dummyUser(action.data)
        break
      case LOG_IN_FAILURE:
        draft.logInLoading = false
        draft.logInError = action.error
        break
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true
        draft.logOutDone = false
        draft.logOutError = null
        break
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false
        draft.logOutDone = true
        draft.me = null
        break
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false
        draft.logOutError = action.error
        break
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true
        draft.signUpDone = false
        draft.signUpError = null
        break
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false
        draft.signUpDone = true
        break
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false
        draft.signUpError = action.error
        break
      case CHANGE_NICNKNAME_REQUEST:
        draft.changeNicknameLoading = true
        draft.changeNicknameDone = false
        draft.changeNicknameError = null
        break
      case CHANGE_NICNKNAME_SUCCESS:
        draft.changeNicknameLoading = false
        draft.changeNicknameDone = true
        break
      case CHANGE_NICNKNAME_FAILURE:
        draft.changeNicknameLoading = false
        draft.changeNicknameError = action.error
        break
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data })
        break
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: [{ id: action.data }, ...state.me.Posts]}
      //   }
      // }
      case REMOVE_POST_OF_ME:
        // 원래는 splice쓰는 것이 원칙임 ! 성능에 문제가 생기면 이쪽 리팩토링하면됨
        draft.me.Posts = state.me.Posts.filter(v => v.id !== action.data)
        break
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: state.me.Posts.filter(v => v.id !== action.data)
      //   }
      // }
      default:
        return state
    }
  })

export default reducer

// thunk
// export const loginAction = data => (dispatch, getState) => {
//   const state = getState()
//   dispatch(loginRequestAction())
//   axios
//     .post('')
//     .then(res => dispatch(loginSuccessAction, res.data))
//     .catch(error => dispatch(loginFailureAction, error))
// }
