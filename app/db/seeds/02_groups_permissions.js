
exports.seed = async (knex, Promise) => {
  await knex('permissions').where('model', 'users').del();
  await knex('permissions').insert([
    {
      name: 'all',
      model: 'users',
    },
    {
      name: 'find',
      model: 'users',
    },
    {
      name: 'paginate',
      model: 'users',
    },
    {
      name: 'findBy',
      model: 'users',
    },
    {
      name: 'paginateBy',
      model: 'users',
    },
    {
      name: 'insert',
      model: 'users',
    },
    {
      name: 'update',
      model: 'users',
    },
    {
      name: 'delete',
      model: 'users',
    },
  ]);
};
