import { all, fork, delay, put, takeLatest, throttle } from 'redux-saga/effects'
import shortid from 'shortid'
import { generateDummyPost } from '../reducers/post'
import {
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_TO_ME,
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS
} from '../reducers/types'

// function loadPostAPI(data) {
//   return axios.post('/api/post', data)
// }

function* loadPost(action) {
  try {
    // const result = yield call(loadPostAPI, action.data)
    yield delay(1000)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(10)
    })
  } catch (error) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: error.response.data
    })
  }
}

// function addPostAPI(data) {
//   return axios.post('/api/post', data)
// }

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000)
    const id = shortid.generate()
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data
      }
    })
    yield put({
      type: ADD_POST_TO_ME,
      data: id
    })
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data
    })
  }
}

// function addCommentAPI(data) {
//   return axios.post('/api/comment', data)
// }

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data)
    yield delay(1000)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    })
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data
    })
  }
}

// function removePostAPI(data) {
//   return axios.post('/api/post', data)
// }

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data)
    yield delay(1000)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    })
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    })
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data
    })
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost)
  ])
}
