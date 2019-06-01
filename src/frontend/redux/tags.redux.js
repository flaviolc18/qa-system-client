import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'tags';

let loadTagsURL = filters => `/api/tags/pergunta/${filters.perguntaId}`;

let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadTagsURL],
  },
});

let getters = gettersFactory({ context });

export const getTag = getters.getOneById;
export const getTagsByFilters = getters.getByFilters;
export const getTagLoadingState = getters.getLoadingState;

export const loadTags = actions.load[0];

export const tags = reducerFactory({ context });
