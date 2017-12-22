const prefix = '@@ro-paginate/';

export const types = {
  RESET: `${prefix}RESET`,
  SEARCH: `${prefix}SEARCH`,
  SEARCH_SUCCESSFUL: `${prefix}SEARCH_SUCCESSFUL`,
};

export const makeNamespacedBox = (namespace, { countKey, currentKey, nextKey, pagesKey, previousKey, resultsKey } = {}) => {
  const actions = {
    reset: () => ({
      type: types.RESET,
      namespace,
    }),
    search: (url, params) => ({
      type: types.SEARCH,
      namespace,
      params,
      url,
    }),
  };

  const initialState = { ...{
    count: null,
    current: null,
    isLoading: false,
    next: null,
    previous: null,
    results: null,
  } };

  const reducer = (state = initialState, action) => {
    if (action.namespace !== namespace) {
      return state;
    }

    switch(action.type) {
      case types.SEARCH:
        return { ...state, isLoading: true };

      case types.RESET:
        return initialState;
      case types.SEARCH_SUCCESSFUL:
        return {
          ...state,
          count: action.data[countKey],
          current: action.data[currentKey],
          isLoading: false,
          next: action.data[nextKey],
          pages: action.data[pagesKey],
          previous: action.data[previousKey],
          results: action.data[resultsKey],
        };

      default:
        return state;
    }
  };

  return {
    actions,
    initialState,
    reducer,
  }
};

export const namespacelessActions = {
  searchSuccessful: (data, { namespace = void 0 } = {}) => ({
    type: types.SEARCH_SUCCESSFUL,
    namespace,
    data,
  }),
};
