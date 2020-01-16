
exports.seed = async (knex, Promise) => {
  await knex('permission').where('model', 'platform').del();
  await knex('permission').insert([
    {
      id: 'list-platform',
      name: 'List',
      key: 'list',
      model: 'platform',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'find-platform',
      name: 'Find',
      key: 'find',
      model: 'platform',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'insert-platform',
      name: 'Insert',
      key: 'insert',
      model: 'platform',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'update-platform',
      name: 'Update',
      key: 'update',
      model: 'platform',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'delete-platform',
      name: 'Delete',
      key: 'delete',
      model: 'platform',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
