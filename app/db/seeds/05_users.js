
exports.seed = async (knex, Promise) => {
  await knex('users').del();
  await knex('users').insert({
    'email': 'admin@user.com',
    'password': '123456',
  });

  const adminUserId = (await knex.where('email', 'admin@user.com').first('id').from('users')).id;
  const adminGroupId = (await knex.where('name', 'admin').first('id').from('groups')).id;

  await knex('users_groups').insert({
    'user_id': adminUserId,
    'group_id': adminGroupId,
  });
};
