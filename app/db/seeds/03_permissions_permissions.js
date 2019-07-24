
exports.seed = async (knex, Promise) => {
  await knex('permissions').where('model', 'permissions').del();
  await knex('permissions').insert([
    {
      name: 'all',
      model: 'permissions',
    },
    {
      name: 'find',
      model: 'permissions',
    },
    {
      name: 'paginate',
      model: 'permissions',
    },
    {
      name: 'findBy',
      model: 'permissions',
    },
    {
      name: 'paginateBy',
      model: 'permissions',
    },
  ]);
};
