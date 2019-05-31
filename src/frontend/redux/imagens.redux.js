import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'imagens';

let loadImagemURL = filters => '/api/imagem/' + filters.id;
let uploadImagemURL = () => '/api/imagem';

let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadImagemURL],
    createOneURLs: [uploadImagemURL],
  },
});

let getters = gettersFactory({ context });

export const getImagem = getters.getOneById;
export const getImagensByFilters = getters.getByFilters;
export const getImagemLoadingState = getters.getLoadingState;

export const loadImagem = actions.load[0];

export const uploadImagem = actions.create[0];

export const imagens = reducerFactory({ context });
