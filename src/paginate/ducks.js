import UrlPattern from 'url-pattern';

const prefix = '@@ro-paginate/';

export const types = {
  FETCH: `${prefix}FETCH`,
  FETCH_SUCCESSFUL: `${prefix}FETCH_SUCCESSFUL`,
  RESET: `${prefix}RESET`,
};

export const initialState = { ...{
  count: null,
  current: null,
  isLoading: false,
  next: null,
  pages: null,
  previous: null,
  results: null,
} };

export const makeNamespacedBox = (namespace, urlPattern, { countKey = 'count', currentPageKey = 'current', nextPageKey = 'next', pageCountKey = 'pages', previousPageKey = 'previous', resultsKey = 'results' } = {}) => {
  const pattern = new UrlPattern(urlPattern);
  
  const actions = {
    fetchItems: (urlVariables, params = {}) => ({
      type: types.FETCH,
      namespace,
      params,
      url: pattern.stringify(urlVariables),
    }),
    reset: () => ({
      type: types.RESET,
      namespace,
    }),
  };

  const reducer = (state = initialState, action) => {
    if (action.namespace !== namespace) {
      return state;
    }

    switch(action.type) {
      case types.FETCH:
        return { ...state, isLoading: true };
      case types.FETCH_SUCCESSFUL:
        return {
          ...state,
          count: action.data[countKey],
          current: action.data[currentPageKey],
          isLoading: false,
          next: action.data[nextPageKey],
          pages: action.data[pageCountKey],
          previous: action.data[previousPageKey],
          results: action.data[resultsKey],
        };
      case types.RESET:
        return initialState;

      default:
        return state;
    }
  };

  return {
    actions,
    reducer,
  };
};

export const namespacelessActions = {
  fetchSuccessful: (data, namespace) => ({
    type: types.FETCH_SUCCESSFUL,
    namespace,
    data,
  }),
};
