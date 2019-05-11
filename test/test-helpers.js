'use strict';

const assert = require('assert');
const Fastify = require('fastify');

const server = require('../src/backend/server');
const core = require('../src/core');

exports.initServer = async function register(tap) {
  const fastify = Fastify();

  server(fastify);
  tap.teardown(() => fastify.close());
  await fastify.ready();

  await core.database.mongoose.connection.db.dropDatabase();

  return fastify;
};

exports.withDB = function(fn) {
  return async t => {
    let isConnected = await core.database.connect();

    assert(isConnected, 'Database should be connected');

    await core.database.mongoose.connection.db.dropDatabase();

    await fn(t);

    isConnected = await core.database.disconnect();
    assert(!isConnected, 'Database should be disconnected');
  };
};

exports.randomObjectId = () => core.database.mongoose.Types.ObjectId();

exports.isValidObjectId = ObjectId => core.database.mongoose.Types.ObjectId.isValid(ObjectId);

exports.convertObjectIdsToString = obj => {
  return Object.entries(obj).reduce((parsedObj, [key, value]) => {
    if (typeof value === 'object' && core.database.mongoose.Types.ObjectId.isValid(value)) {
      parsedObj[key] = value.toString();
    } else {
      parsedObj[key] = value;
    }

    return parsedObj;
  }, {});
};
