import { serialize } from '../../utils';

const productionURL = 'https://qa-system-client.herokuapp.com';
const developmentURL = `http://localhost:${process.env.PORT || 3000}`;

const serverBaseURL = process.env.NODE_ENV === 'production' ? productionURL : developmentURL;

function request({ method, url, body }) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors',
    credentials: 'include',
  };

  opts.body = method === 'GET' ? undefined : JSON.stringify(body || {});

  return fetch(serverBaseURL + url, opts).then(res => res.json());
}

export const http = {
  get(url, body) {
    return request({
      method: 'GET',
      url: url + serialize(body),
    });
  },
  delete(url, body) {
    return request({ url, method: 'DELETE', body });
  },
  post(url, body) {
    return request({ url, method: 'POST', body });
  },
  upload(url, body) {
    return fetch(serverBaseURL + url, { method: 'POST', body }).then(res => res.json());
  },
};
