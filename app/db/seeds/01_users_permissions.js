
exports.seed = async (knex, Promise) => {
  await knex('permissions').where('model', 'groups').del();
  await knex('permissions').insert([
    {
      name: 'all',
      model: 'groups',
    },
    {
      name: 'find',
      model: 'groups',
    },
    {
      name: 'paginate',
      model: 'groups',
    },
    {
      name: 'findBy',
      model: 'groups',
    },
    {
      name: 'paginateBy',
      model: 'groups',
    },
    {
      name: 'insert',
      model: 'groups',
    },
    {
      name: 'update',
      model: 'groups',
    },
    {
      name: 'delete',
      model: 'groups',
    },
  ]);
};
