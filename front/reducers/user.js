import produce from 'immer'
import {
  ADD_POST_TO_ME,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_POST_OF_ME,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE
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
  loadUserLoading: false, // 유저정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,
  loadFollowersLoading: false, // 유저정보 가져오기 시도중
  loadFollowersDone: false,
  loadFollowersError: null,
  loadFollowingsLoading: false, // 유저정보 가져오기 시도중
  loadFollowingsDone: false,
  loadFollowingsError: null,
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
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
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
  signUpData: {},
  loginData: {}
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true
        draft.removeFollowerError = null
        draft.removeFollowerDone = false
        break
      case REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false
        draft.me.Followers = draft.me.Followers.filter(
          v => v.id !== action.data.UserId
        )
        draft.removeFollowerDone = true
        break
      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false
        draft.removeFollowerError = action.error
        break
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true
        draft.loadUserDone = false
        draft.loadUserError = null
        break
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false
        draft.loadUserDone = true
        draft.me = action.data
        break
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false
        draft.loadUserError = action.error
        break
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true
        draft.loadFollowersDone = false
        draft.loadFollowersError = null
        break
      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false
        draft.loadFollowersDone = true
        draft.me.Followers = action.data
        break
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false
        draft.loadUserError = action.error
        break
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true
        draft.loadFollowingsDone = false
        draft.loadFollowingsError = null
        break
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false
        draft.loadFollowingsDone = true
        draft.me.Followings = action.data
        break
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false
        draft.loadFollowingsError = action.error
        break
      case FOLLOW_REQUEST:
        draft.followLoading = true
        draft.followDone = false
        draft.followError = null
        break
      case FOLLOW_SUCCESS:
        draft.followLoading = false
        draft.followDone = true
        draft.me.Followings.push({ id: action.data.UserId })
        break
      case FOLLOW_FAILURE:
        draft.followLoading = false
        draft.followError = action.error
        break
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true
        draft.unfollowDone = false
        draft.unfollowError = null
        break
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false
        draft.unfollowDone = true
        draft.me.Followings = draft.me.Followings.filter(
          v => v.id !== action.data.UserId
        )
        break
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false
        draft.unfollowError = action.error
        break
      case LOG_IN_REQUEST:
        draft.logInLoading = true
        draft.logInDone = false
        draft.logInError = null
        break
      case LOG_IN_SUCCESS:
        draft.logInLoading = false
        draft.logInDone = true
        draft.me = action.data
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
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true
        draft.changeNicknameDone = false
        draft.changeNicknameError = null
        break
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false
        draft.changeNicknameDone = true
        draft.me.nickname = action.data.nickname
        break
      case CHANGE_NICKNAME_FAILURE:
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
