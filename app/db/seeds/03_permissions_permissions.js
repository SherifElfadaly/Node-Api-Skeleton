
exports.seed = async (knex, Promise) => {
  await knex('permission').where('model', 'permission').del();
  await knex('permission').insert([
    {
      id: 'list-permission',
      name: 'List',
      key: 'list',
      model: 'permission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      id: 'find-permission',
      name: 'Find',
      key: 'find',
      model: 'permission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
