
exports.seed = async (knex, Promise) => {
  await knex('role_permission').del();
  await knex('permission').where('model', 'user').del();
  await knex('permission').insert([
    {
      id: 'list-user',
      name: 'List',
      key: 'list',
      model: 'user',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'find-user',
      name: 'Find',
      key: 'find',
      model: 'user',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'insert-user',
      name: 'Insert',
      key: 'insert',
      model: 'user',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'update-user',
      name: 'Update',
      key: 'update',
      model: 'user',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'delete-user',
      name: 'Delete',
      key: 'delete',
      model: 'user',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'sendConfirmEmail-user',
      name: 'sendConfirmEmail',
      key: 'sendConfirmEmail',
      model: 'user',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'resetUserPassword-user',
      name: 'resetUserPassword',
      key: 'resetUserPassword',
      model: 'user',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'assignRole-user',
      name: 'assignRole',
      key: 'assignRole',
      model: 'user',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
