'use-strict';

module.exports = function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action;

    if (!types) {
      return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }
    const [requestType, successType, failureType] = types;

    if (!shouldCallAPI(getState())) {
      return;
    }

    dispatch(
      Object.assign({}, payload, {
        type: requestType,
      })
    );

    return callAPI()
      .then(response => {
        dispatch(
          Object.assign({}, payload, {
            response,
            type: successType,
          })
        );

        return response;
      })
      .catch(error => {
        dispatch(
          Object.assign({}, payload, {
            error,
            type: failureType,
          })
        );

        return error;
      });
  };
};
