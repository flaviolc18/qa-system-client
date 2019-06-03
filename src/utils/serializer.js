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
    const key = prefix || p;
    const value = obj[p];

    str.push(Array.isArray(value) ? serialize(value, key) : encodeURIComponent(key) + '=' + encodeURIComponent(value));
  }

  return str.join('&');
}

function deserialize(data) {
  const obj = {};

  (data || '').split('&').map(param => {
    const [key, value] = param.split('=');

    if (decodeURIComponent(key) !== '') {
      if (!obj[decodeURIComponent(key)]) {
        obj[decodeURIComponent(key)] = decodeURIComponent(value);
      } else {
        obj[decodeURIComponent(key)] = Array.isArray(obj[decodeURIComponent(key)])
          ? [...obj[decodeURIComponent(key)], decodeURIComponent(value)]
          : [obj[decodeURIComponent(key)], decodeURIComponent(value)];
      }
    }
  });

  return obj;
}
