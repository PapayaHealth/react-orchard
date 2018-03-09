import { call, put, takeEvery } from 'redux-saga/effects';
import { namespacelessActions, types } from './ducks';
import Qs from 'qs';

export default (api) => {
  function* fetch(action) {
    const results = yield call(api.get, action.url,
      { params: action.params, paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }) });
    
    yield put(namespacelessActions.fetchSuccessful(results.data, action.namespace));
  }

  function* watchFetch() {
    yield takeEvery(types.FETCH, fetch);
  }

  return {
    fetch,
    watchFetch,
  };
};
