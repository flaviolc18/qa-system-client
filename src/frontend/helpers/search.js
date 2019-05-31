import { deserialize } from '../../utils';

export function getSearch(location) {
  const search = location.search.substr(1);
  return deserialize(search);
}
