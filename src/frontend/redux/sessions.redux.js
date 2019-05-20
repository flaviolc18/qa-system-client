import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'app';

let loadSessionURL = () => '/api/sessions';
let logoutURL = () => '/api/usuarios/logout';
let loginURL = () => '/api/usuarios/login';

let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadSessionURL],
    createOneURLs: [loginURL],
    removeOneURLs: [logoutURL],
  },
});

export const login = actions.create[0];
export const logout = actions.remove[0];
export const loadSession = () => actions.load[0]({});

let getters = gettersFactory({ context });

export const app = reducerFactory({ context });

export const getSession = state => getters.getByFilters(state, {})[0];
