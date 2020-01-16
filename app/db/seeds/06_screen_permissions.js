
exports.seed = async (knex, Promise) => {
  await knex('permission').where('model', 'screen').del();
  await knex('permission').insert([
    {
      id: 'list-screen',
      name: 'List',
      key: 'list',
      model: 'screen',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'find-screen',
      name: 'Find',
      key: 'find',
      model: 'screen',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'insert-screen',
      name: 'Insert',
      key: 'insert',
      model: 'screen',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'update-screen',
      name: 'Update',
      key: 'update',
      model: 'screen',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'delete-screen',
      name: 'Delete',
      key: 'delete',
      model: 'screen',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
