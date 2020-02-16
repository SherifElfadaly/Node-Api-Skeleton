
exports.seed = async (knex, Promise) => {
  await knex('role_permission').del();
  await knex('permission').where('model', 'oauthClient').del();
  await knex('permission').insert([
    {
      id: 'list-oauthClient',
      name: 'List',
      key: 'list',
      model: 'oauthClient',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'find-oauthClient',
      name: 'Find',
      key: 'find',
      model: 'oauthClient',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'insert-oauthClient',
      name: 'Insert',
      key: 'insert',
      model: 'oauthClient',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'update-oauthClient',
      name: 'Update',
      key: 'update',
      model: 'oauthClient',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'delete-oauthClient',
      name: 'Delete',
      key: 'delete',
      model: 'oauthClient',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
