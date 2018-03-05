import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { types } from '../ducks';
import sagas from '../sagas';
import sagaHelper from 'redux-saga-testing';

describe('snackbarTimeout', () => {
  const it = sagaHelper(sagas().snackbarTimeout({}));

  it('should delay for 6 seconds', (result) => {
    expect(JSON.stringify(result))
      .toEqual(JSON.stringify(delay(6000)));
  });

  it('should put hide action', (result) => {
    expect(result)
      .toEqual(put({ type: types.HIDE_LATEST_MESSAGE }));
  });
});