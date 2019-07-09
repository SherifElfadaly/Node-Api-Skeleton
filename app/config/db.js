const {Model, transaction} = require('objection');
const knex = require('knex')(require('./knexfile'));
const softDelete = require('objection-soft-delete');
const password = require('objection-password')();
const {DBErrors} = require('objection-db-errors');

Model.knex(knex);

module.exports = {
  'knex': knex,
  // eslint-disable-next-line new-cap
  'Model': softDelete({columnName: 'deleted'})(password(DBErrors(Model))),
  'transaction': transaction,
};
