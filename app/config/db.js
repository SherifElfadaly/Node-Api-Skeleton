const {Model, transaction} = require('objection');
const knex = require('knex')(require('./knexfile'));
const softDelete = require('objection-soft-delete');
const {DBErrors} = require('objection-db-errors');

Model.knex(knex);

module.exports = {
  'knex': knex,
  // eslint-disable-next-line new-cap
  'Model': softDelete({columnName: 'deleted'})(DBErrors(Model)),
  'transaction': transaction,
};
