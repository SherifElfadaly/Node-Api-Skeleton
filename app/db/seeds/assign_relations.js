
exports.seed = async (knex, Promise) => {
  const adminGroupId = (await knex.where('name', 'admin').first('id').from('groups')).id;
  await knex('groups_permissions').del();
  const permissions = await knex.select('id').from('permissions');
  const groupsPermissions = [];
  permissions.forEach(async (permission) => {
    groupsPermissions.push(
        {
          permission_id: permission.id,
          group_id: adminGroupId,
        });
  });
  await knex('groups_permissions').insert(groupsPermissions);
};
