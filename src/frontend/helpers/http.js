function request({ method, url, body }) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  opts.body = method === 'GET' ? undefined : JSON.stringify(body || {});

  return fetch(url, opts).then(res => res.json());
}

export const http = {
  get(url, query) {
    query = JSON.stringify(query);

    return request({
      method: 'GET',
      url: url + '?' + query,
    });
  },
  delete(url, body) {
    return request({ url, method: 'DELETE', body });
  },
  post(url, body) {
    return request({ url, method: 'POST', body });
  },
};
