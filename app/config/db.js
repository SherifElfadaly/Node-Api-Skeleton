const {Model} = require('objection');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: container.config.db_host,
    user: container.config.db_user,
    password: container.config.db_password,
    database: container.config.db_name,
    charset: 'utf8',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: '../db/migrations',
  },
  seeds: {
    directory: '../db/seeds',
  },
});

Model.knex(knex);

module.exports = {
  'knex': knex,
  'Model': Model,
};
