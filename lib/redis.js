'use strict';

var redis = require('then-redis');
var env = process.env.NODE_ENV || 'development';
var config = {
  redis_host: '127.0.0.1',
  redis_port: '6379',
  redis_auth: ''
}
var db = redis.createClient({
  host: config.redis_host,
  port: config.redis_port,
  password: config.redis_auth,
  db: 6
});

// db.select(6);

module.exports = db;