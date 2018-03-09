import { initialState, makeNamespacedBox, namespacelessActions } from '../ducks';

describe('actions and reducer', () => {
  // Testing namespace, url pattern, and customizing some keys
  const testPaginator = makeNamespacedBox('testPaginator', 
    '/users/:id/items', 
    { countKey: 'itemCount', 
      currentPageKey: 'currentPage', nextPageKey: 'nextPage', 
      previousPageKey: 'previousPage',
    });

  it('should return action to fetch items', () => {
    expect(testPaginator.actions.fetchItems({ id: 5 }, { 'ordering': '-date' }))
      .toEqual({
        type: '@@ro-paginate/FETCH',
        namespace: 'testPaginator',
        params: { 'ordering': '-date' },
        url: '/users/5/items'
      });
  });

  it('should reset reducer', () => {
    const state = {
      ...initialState,
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
    };

    const action = testPaginator.actions.reset();

    expect(testPaginator.reducer(state, action))
      .toEqual(initialState);
  });

  it('should save fetched items to reducer', () => {
    const action = namespacelessActions.fetchSuccessful({
      itemCount: 9,
      currentPage: 1,
      nextPage: 2,
      pages: 2,
      previousPage: null,
      results: [
        { id: 5, name: 'Yes I am' },
        { id: 4, name: 'Yes I was' },
        { id: 3, name: 'Yes I did' },
        { id: 2, name: 'Yes I will' },
        { id: 1, name: 'Yes I can' },
      ],
    }, 'testPaginator');

    expect(testPaginator.reducer(initialState, action))
      .toEqual({
        count: 9,
        current: 1,
        isLoading: false,
        next: 2,
        pages: 2,
        previous: null,
        results: [
          { id: 5, name: 'Yes I am' },
          { id: 4, name: 'Yes I was' },
          { id: 3, name: 'Yes I did' },
          { id: 2, name: 'Yes I will' },
          { id: 1, name: 'Yes I can' },
        ],
      });
  });
});