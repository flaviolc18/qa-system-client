function request({ method, url, body }) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  opts.body = method === 'GET' ? JSON.stringify(body) : JSON.stringify(body || {});

  return fetch(url, opts).then(res => res.json());
}

export const http = {
  get(url) {
    return request({
      method: 'GET',
      url: url,
    });
  },
  delete(url, body) {
    return request({ url, method: 'DELETE', body: body });
  },
  post(url, body) {
    return request({ url, method: 'POST', body });
  },
};

/*
http.get("route").then(response => console.log(response) ) 
    -- usar get para fazer requisições http sem um body, dados são passados somente atraves da url nos parametros, ex: "/api/teste/:param"
http.post("route", body).then(response => console.log(response) )
    -- usar post quando é nescessário mandar dados complexos para o servidor como objetos
http.delete("route", body).then(response => console.log(response) )
    --usar delete quando é nescessário solicitar a destruiçãi explicita de alguma entidade do banco de dados
*/
