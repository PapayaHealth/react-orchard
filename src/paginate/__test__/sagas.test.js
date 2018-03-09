import { api } from '../../misc/testHelpers';
import { call, put } from 'redux-saga/effects';
import { makeNamespacedBox, namespacelessActions, types } from '../ducks';
import Qs from 'qs';
import sagas from '../sagas';

describe('fetch', () => {
  const testPaginator = makeNamespacedBox('testPaginator', '/users/:id/:resource');
  const allSagas = sagas(api);

  it('should fetch data from api that will then be paginated', () => {
    const action = testPaginator.actions.fetchItems({ id: 43, resource: 'items' }, { ordering: '-id' });
    const saga = allSagas.fetch(action);
    
    let next = saga.next();
    expect(JSON.stringify(next.value))
      .toEqual(JSON.stringify(call(api.get, '/users/43/items', 
        { params: { ordering: '-id' }, paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }) })));
    
    const response = {
      data: {
        count: 21,
        current: 2,
        next: 3,
        pages: 4,
        previous: 1,
        results: [
          { id: 23, name: 'Test' },
          { id: 22, name: 'Mo Test' },
          { id: 21, name: 'Yup, Test' },
          { id: 20, name: 'Yay, Test' },
        ],
      },
    };

    next = saga.next(response);
    expect(next.value)
      .toEqual(put(namespacelessActions.fetchSuccessful(response.data, 'testPaginator')));
  });
});