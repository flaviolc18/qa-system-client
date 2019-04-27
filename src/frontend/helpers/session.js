import { http } from './http';
import { getSearch } from './search';

export function getSession() {
  return http.get('/api/sessions').then(session => session);
}

export function isSessionValid(location) {
  return http.get('/api/sessions').then(session => {
    if (session && session.usuarioId) {
      let filter = getSearch(location);

      filter.sessionId = session._id;
      filter.usuarioId = session.usuarioId;

      return true;
    }
    return false;
  });
}
