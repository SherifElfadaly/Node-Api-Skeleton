const {Model, transaction} = require('objection');
const knex = require('knex')(require('./knexfile'));
const softDelete = require('objection-soft-delete');
const password = require('objection-password')();

Model.knex(knex);

module.exports = {
  'knex': knex,
  'Model': softDelete({columnName: 'deleted'})(password(Model)),
  'transaction': transaction,
};
