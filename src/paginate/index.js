import { makeNamespacedBox } from './ducks';
import sagas from './sagas';

export const createPaginator = (namespace, { countKey = 'count', currentKey = 'current',
  nextKey = 'next', pagesKey = 'pages', previousKey = 'previous', resultsKey = 'results' } = {}) => {

  return makeNamespacedBox(namespace, { countKey, currentKey, nextKey, pagesKey, previousKey, resultsKey });
}

export { sagas };
