
exports.seed = async (knex, Promise) => {
  /**
   * Insert all permissions to admin role.
   */
  const adminPermissions = await knex.select('id').from('permission');
  await assignPermissions(knex, 'admin', adminPermissions);
};

/**
 * Assign permissions for the given role
 *
 * @param   {object}  knex
 * @param   {string}  role
 * @param   {array}  permissions
 *
 * @return  {void}
 */
async function assignPermissions(knex, role, permissions) {
  const roleId = (await knex.where('key', role).first('id').from('role')).id;
  const rolesPermissions = [];
  permissions.forEach(async (permission) => {
    rolesPermissions.push(
        {
          permission_id: permission.id,
          role_id: roleId,
          created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
          updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
        });
  });
  await knex('role_permission').insert(rolesPermissions);
}
