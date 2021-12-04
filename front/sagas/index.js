import { all, fork } from 'redux-saga/effects'
import postSaga from './post'
import userSaga from './user'

// rootsaga를 만들고 비동기 액션을 넣어주면 된다.
// all은 그런 애들을 동시에 실행시켜준다.
// fork는 제너레이터 함수 실행 <->  call 차이를 알아야 함
export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)])
}
