import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import { types } from './ducks';

export default () => {
  function* snackbarTimeout(action) {
    yield delay(6000);
    yield put({ type: types.HIDE_LATEST_MESSAGE });
  }

  function* watchSnackbarTimeout() {
    yield takeEvery(types.INIT_SNACKBAR_TIMEOUT, snackbarTimeout);
  }

  return {
    snackbarTimeout,
    watchSnackbarTimeout,
  };
};