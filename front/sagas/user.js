import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  FOLLOW_REQUEST
} from '../reducers/types'
import { all, fork, put, takeLatest, call } from '@redux-saga/core/effects'
import axios from 'axios'

// action.data가 data로 들어감 -> go 함수 느낌으로
// effct앞에 yield를 붙여주는 이유는 테스트하기에 편리해서
function logInAPI(data) {
  return axios.post('/user/login', data)
}

// call과 fork의 차이점
// fork는  비동기적으로 처리될 수 있도록 도와주는 API -> 요청 보내고, 결과를 기다리는 것과 별개로 다음 것을 실행함. (non-blocking)
// call은 동기적으로 처리되도록 도와주는 API -> logInAPI가 리턴할 때까지 기다림. -> result에 넣어줌 (blocking)

// call은 결과값을 기다림(yield가 await와 비슷), fork는 바로 다음값으로 넘어감(await가 없는 느낌)

// saga와 reducer가 동시에 실행되는데 reducer가 조금 더 앞에서 실행된다.
function* logIn(action) {
  try {
    const res = yield call(logInAPI, action.data) // 요청의 결괄르 받음
    yield put({
      // put은 dispatch와 같다.
      type: LOG_IN_SUCCESS,
      data: res.data
    })
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data
    })
  }
}

function logOutAPI(data) {
  return axios.post('/user/logout', data)
}

function* logOut(action) {
  try {
    const res = yield call(logOutAPI, action.data)
    yield put({
      type: LOG_OUT_SUCCESS,
      data: res.data
    })
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data
    })
  }
}

function signUpAPI(data) {
  return axios.post('/user', data)
}

function* signUp(action) {
  try {
    const res = yield call(signUpAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
      data: res.data
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data
    })
  }
}

function followAPI(data) {
  return axios.post('/user/follow', data)
}

function* follow(action) {
  try {
    const res = yield call(followAPI, action.data)
    yield put({
      type: FOLLOW_SUCCESS,
      data: res.data
    })
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data
    })
  }
}

function unfollowAPI(data) {
  return axios.post('/user/unfollow', data)
}

function* unfollow(action) {
  try {
    const res = yield call(unfollowAPI, action.data)
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: res.data
    })
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data
    })
  }
}

// LOG_IN 액션이 실행될 때까지 기다리겠다. 그리고 logIn을 실행
// take는 일회용이다. 딱 1회만 실행된다. -> 해당 이벤트리스너가 사라짐
// 그래서 제너레이터를 이용한 무한을 만든다. -> 이것은 동기적으로 동작함
// 하지만 직관적이지 않아서 takeEvery를 활용 -> 이것은 비동기로 동작

// takeLatest는 동시에 여러 이벤트가 발생했을 때, 완료되지 않은 것을 취소하고, 마지막 것만 알아서 실행해줌.
// 하지만 front-end에서만 마지막 것만 사용한다고 생각
// 실제로 요청은 모두 하는데, 서버에서 받은 응답을 컨트롤 하는 것이라고 생각
// 새로고침하면 서버에 쌓인 데이터가 그대로 나타날 수 있다.
// 그래서 서버에서 처리를 해줘야 한다.

// throttle 요청을 시간 제한을 통해서 컨트롤 가능
// 보통 특수한 경우에 사용
// 일반적으로 takeLatest 사용
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow)
  ])
}
