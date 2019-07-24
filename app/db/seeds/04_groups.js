
exports.seed = async (knex, Promise) => {
  await knex('users_groups').del();
  await knex('groups').del();
  await knex('groups').insert({
    'name': 'admin',
  });
};
