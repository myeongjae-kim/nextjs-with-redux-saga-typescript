import { applyMiddleware, createStore, Middleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer, { exampleInitialState } from './reducer'
import rootSaga from './saga'

const bindMiddleware = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middlewares))
  }
  return applyMiddleware(...middlewares)
}

function configureStore(initialState = exampleInitialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store: any = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
