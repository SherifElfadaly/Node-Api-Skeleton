
exports.seed = async (knex, Promise) => {
  /**
   * Insert all permissions to admin role.
   */
  await knex('roles_permissions').del();
  const adminRoleId = (await knex.where('name', 'admin').first('id').from('roles')).id;
  const permissions = await knex.select('id').from('permissions');
  const rolesPermissions = [];
  permissions.forEach(async (permission) => {
    rolesPermissions.push(
        {
          permission_id: permission.id,
          role_id: adminRoleId,
          created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
          updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
        });
  });
  await knex('roles_permissions').insert(rolesPermissions);
};
