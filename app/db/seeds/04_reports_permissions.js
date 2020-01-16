
exports.seed = async (knex, Promise) => {
  await knex('permission').where('model', 'report').del();
  await knex('permission').insert([
    {
      id: 'list-report',
      name: 'List',
      key: 'list',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'find-report',
      name: 'Find',
      key: 'find',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'roles_count-report',
      name: 'Roles Count',
      key: 'roles_count',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
