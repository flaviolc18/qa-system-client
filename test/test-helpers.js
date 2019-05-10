'use strict';

const assert = require('assert');
const Fastify = require('fastify');

const server = require('../src/server');
const db = require('../src/core/database');

exports.initServer = async function register(tap) {
  const fastify = Fastify();

  server(fastify);
  tap.teardown(() => fastify.close());
  await fastify.ready();

  await db.mongoose.connection.db.dropDatabase();

  return fastify;
};

exports.withDB = function(fn) {
  return async t => {
    let isConnected = await db.connect();

    assert(isConnected, 'Database should be connected');

    await db.mongoose.connection.db.dropDatabase();

    await fn(t);

    isConnected = await db.disconnect();
    assert(!isConnected, 'Database should be disconnected');
  };
};

exports.randomObjectId = () => db.mongoose.Types.ObjectId();

exports.isValidObjectId = ObjectId => db.mongoose.Types.ObjectId.isValid(ObjectId);

exports.convertObjectIdsToString = obj => {
  return Object.entries(obj).reduce((parsedObj, [key, value]) => {
    if (typeof value === 'object' && db.mongoose.Types.ObjectId.isValid(value)) {
      parsedObj[key] = value.toString();
    } else {
      parsedObj[key] = value;
    }

    return parsedObj;
  }, {});
};
