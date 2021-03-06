import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'
import reducer from '../reducers/index'
import rootSaga from '../sagas'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

const loggerMiddleware = () => next => action => {
  console.log(action)
  return next(action)
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, loggerMiddleware]
  const enhancer =
    process.env.Node_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares))

  const store = createStore(reducer, enhancer)
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

const wrapper = createWrapper(configureStore, {
  debug: false
})

export default wrapper
