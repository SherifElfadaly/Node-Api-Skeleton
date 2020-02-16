
exports.seed = async (knex, Promise) => {
  await knex('permission').where('model', 'role').del();
  await knex('permission').insert([
    {
      id: 'list-role',
      name: 'List',
      key: 'list',
      model: 'role',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'find-role',
      name: 'Find',
      key: 'find',
      model: 'role',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'insert-role',
      name: 'Insert',
      key: 'insert',
      model: 'role',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'update-role',
      name: 'Update',
      key: 'update',
      model: 'role',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'delete-role',
      name: 'Delete',
      key: 'delete',
      model: 'role',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
