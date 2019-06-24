const {Model, transaction} = require('objection');
const knex = require('knex')(require('./knexfile'));
const softDelete = require('objection-soft-delete');

Model.knex(knex);

module.exports = {
  'knex': knex,
  'Model': softDelete({columnName: 'deleted'})(Model),
  'transaction': transaction,
};
