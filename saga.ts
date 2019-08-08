/* global fetch */

import es6promise from 'es6-promise'
import 'isomorphic-unfetch'
import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'

import { getType } from 'typesafe-actions';
import { failure, loadData, loadDataSuccess, startClock, tickClock } from './actions'

es6promise.polyfill()

function* runClockSaga() {
  yield take(getType(startClock))
  while (true) {
    yield put(tickClock(false))
    yield delay(1000)
  }
}

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess({ data }))
  } catch (err) {
    yield put(failure(err))
  }
}

function* rootSaga() {
  yield all([
    call(runClockSaga),
    takeLatest(getType(loadData), loadDataSaga)
  ])
}

export default rootSaga
