'use strict';

module.exports = {
  serialize: function serialize(obj, prefix) {
    if (!obj) {
      return '';
    }
    const str = [];
    let p;

    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? prefix + '[' + p + ']' : p,
          v = obj[p];

        str.push(
          v !== null && typeof v === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v)
        );
      }
    }

    return str.join('&');
  },

  deserialize: function(data) {
    const obj = {};

    (data || '').split('&').map(param => {
      const element = param.split('=');

      if (decodeURIComponent(element[0]) !== '') {
        obj[decodeURIComponent(element[0])] = decodeURIComponent(element[1]);
      }
    });

    return obj;
  },
};
