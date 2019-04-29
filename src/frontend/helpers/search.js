import { deserialize } from './serializer';

export function getSearch(location) {
  const search = location.search.substr(1);
  return deserialize(search);
}
