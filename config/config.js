module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DEV_DB_PASSWORD,
    "database": "wx_boilerplate_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "dialectOptions": {
        "charset": "utf8mb4"
    }
  },
  "test": {
    "username": "root",
    "password": "123456",
    "database": "wx_boilerplate_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_DATABASE,
    "host": process.env.PROD_DB_HOST,
    "port": process.env.PROD_DB_PORT,
    "dialect": "mysql",
    "dialectOptions": {
        "charset": "utf8mb4"
    }
  },
  "wx_boilerplate_production2": {
    "username": "root",
    "password": "password",
    "database": "wx_boilerplate_production1",
    "host": "dbhost",
    "port": 3306,
    "dialect": "mysql",
    "dialectOptions": {
        "charset": "utf8mb4"
    }
  }
}