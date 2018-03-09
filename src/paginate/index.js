import { makeNamespacedBox, types } from './ducks';
import sagas from './sagas';

export const createPaginator = makeNamespacedBox;

export { types, sagas };
