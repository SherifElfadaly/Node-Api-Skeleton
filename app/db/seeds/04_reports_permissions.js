
exports.seed = async (knex, Promise) => {
  await knex('permission').where('model', 'report').del();
  await knex('permission').insert([
    {
      name: 'All',
      key: 'all',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      name: 'Find',
      key: 'find',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      name: 'Paginate',
      key: 'paginate',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      name: 'FindBy',
      key: 'findBy',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      name: 'PaginateBy',
      key: 'paginateBy',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      name: 'Roles Count',
      key: 'roles_count',
      model: 'report',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};
