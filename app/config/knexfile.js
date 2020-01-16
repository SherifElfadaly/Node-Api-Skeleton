module.exports = {
  client: process.env.DB_DRIVER,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    charset: 'utf8',
  },
  pool: {
    min: 2,
    max: 100,
  },
  migrations: {
    directory: '../db/migrations',
  },
  seeds: {
    directory: '../db/seeds',
  },
};
