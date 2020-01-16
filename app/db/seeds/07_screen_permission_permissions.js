
exports.seed = async (knex, Promise) => {
  await knex('permission').where('model', 'screenPermission').del();
  await knex('permission').insert([
    {
      id: 'list-screenPermission',
      name: 'List',
      key: 'list',
      model: 'screenPermission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'find-screenPermission',
      name: 'Find',
      key: 'find',
      model: 'screenPermission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'insert-screenPermission',
      name: 'Insert',
      key: 'insert',
      model: 'screenPermission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'update-screenPermission',
      name: 'Update',
      key: 'update',
      model: 'screenPermission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'delete-screenPermission',
      name: 'Delete',
      key: 'delete',
      model: 'screenPermission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
