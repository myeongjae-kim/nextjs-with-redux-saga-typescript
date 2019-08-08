import { createAction, createStandardAction } from 'typesafe-actions';

export const failure = createStandardAction('FAILURE')<{ error: any }>()
export const increment = createStandardAction('INCREMENT')();
export const decrement = createStandardAction('DECREMENT')();
export const reset = createStandardAction('RESET')();
export const loadData = createStandardAction('LOAD_DATA')();
export const loadDataSuccess = createStandardAction('LOAD_DATA_SUCCESS')<{ data: any }>()
export const startClock = createStandardAction('START_CLOCK')();
export const tickClock = createAction('TICK_CLOCK', action =>
  (isServer: boolean) => action({ light: !isServer, ts: Date.now() }));
