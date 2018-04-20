module.exports = {
  "development": {
    "corpID": "corpID_development",
    "secret": "secret_development",
    "agentId": "agentId_development",
    "contactSecret": "contactSecret_development",
    "redisKey": "redisKey-development-token",
    "contactRedisKey": "contactRedisKey-development-token",
    "host": "http://development"
  },
  "test": {
    "username": "root",
    "password": "123456",
    "database": "wx_boilerplate_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "wx_boilerplate_production1": {
    "corpID": "ww000000000001",
    "secret": "secret1",
    "agentId": "agentId",
    "contactSecret": "contactSecret1",
    "redisKey": "redisKey-token1",
    "contactRedisKey": "contactRedisKey-token1",
    "host": "http://production1"
  },
  "wx_boilerplate_production2": {
    "corpID": "ww000000000002",
    "secret": "secret2",
    "agentId": "agentId",
    "contactSecret": "contactSecret2",
    "redisKey": "redisKey-token2",
    "contactRedisKey": "contactRedisKey-token2",
    "host": "http://production2"
  }
}