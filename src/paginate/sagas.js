import { call, put, takeEvery } from 'redux-saga/effects';
import { namespacelessActions, types } from './ducks';
import Qs from 'qs';

export default (api) => {
  function* search(action) {
    const results = yield call(api.get, action.url,
      { params: action.params, paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }) });
    yield put(namespacelessActions.searchSuccessful(results.data, { namespace: action.namespace }));
  }

  function* watchSearch() {
    yield takeEvery(types.SEARCH, search);
  }

  return {
    search,
    watchSearch,
  };
};
