'use strict';

exports.serialize = serialize;
exports.deserialize = deserialize;

function serialize(obj, prefix) {
  if (!obj) {
    return '';
  }
  const str = [];
  let p;

  for (p in obj) {
    const k = prefix ? prefix + '[' + p + ']' : p,
      v = obj[p];

    str.push(
      v !== null && typeof v === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v)
    );
  }

  return str.join('&');
}

function deserialize(data) {
  const obj = {};

  (data || '').split('&').map(param => {
    const [key, value] = param.split('=');

    if (decodeURIComponent(key) !== '') {
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });

  return obj;
}
