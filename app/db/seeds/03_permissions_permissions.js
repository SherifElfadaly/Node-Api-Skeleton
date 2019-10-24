
exports.seed = async (knex, Promise) => {
  await knex('permission').where('model', 'permission').del();
  await knex('permission').insert([
    {
      name: 'List',
      key: 'list',
      model: 'permission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      name: 'Find',
      key: 'find',
      model: 'permission',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
