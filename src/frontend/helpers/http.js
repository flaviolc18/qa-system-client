const devServerUrl = 'http://localhost:3000';

process.env.ENV;

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

  return fetch(devServerUrl + url, opts).then(res => res.json());
}

export const http = {
  get(url) {
    return request({
      method: 'GET',
      url,
    });
  },
  delete(url, body) {
    return request({ url, method: 'DELETE', body });
  },
  post(url, body) {
    return request({ url, method: 'POST', body });
  },
  upload(url, body) {
    return fetch(devServerUrl + url, { method: 'POST', body }).then(res => res.json());
  },
};
