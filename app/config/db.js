const {Model} = require('objection');
const knex = require('knex')(require('./knexfile'));

Model.knex(knex);

module.exports = {
  'knex': knex,
  'Model': Model,
};
