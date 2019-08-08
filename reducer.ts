import { decrement, failure, increment, loadDataSuccess, reset, tickClock } from 'actions';
import { AnyAction } from 'redux';
import { getType } from 'typesafe-actions';

export const exampleInitialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

function reducer(state = exampleInitialState, action: AnyAction) {
  switch (action.type) {
    case getType(failure):
      return {
        ...state,
        ...{ error: action.payload.error }
      }

    case getType(increment):
      return {
        ...state,
        ...{ count: state.count + 1 }
      }

    case getType(decrement):
      return {
        ...state,
        ...{ count: state.count - 1 }
      }

    case getType(reset):
      return {
        ...state,
        ...{ count: exampleInitialState.count }
      }

    case getType(loadDataSuccess):
      return {
        ...state,
        ...{ placeholderData: action.payload.data }
      }

    case getType(tickClock):
      return {
        ...state,
        ...{ lastUpdate: action.payload.ts, light: !!action.payload.light }
      }

    default:
      return state
  }
}

export default reducer
