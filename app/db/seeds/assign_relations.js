
exports.seed = async (knex, Promise) => {
  /**
   * Insert all permissions to admin role.
   */
  const adminPermissions = await knex.select('id').from('permission');
  const adminScreenPermissions = await knex.select('id').from('screen_permission');
  await assignPermissions(knex, 'admin', adminPermissions);
  await assignScreenPermissions(knex, 'admin', adminScreenPermissions);

  const rolePermissions = {};
  const roleScreenPermissions = await knex.select('role_id', 'screen_permission_id').from('role_screen_permission');
  for (let index = 0; index < roleScreenPermissions.length; index++) {
    const roleScreenPermission = roleScreenPermissions[index];
    const screenPermission = await knex.select('permission_id').from('screen_permission').where('id', roleScreenPermission.screen_permission_id).first();
    rolePermissions[roleScreenPermission.role_id] = rolePermissions[roleScreenPermission.role_id] || {};
    rolePermissions[roleScreenPermission.role_id][screenPermission.permission_id] = {id: screenPermission.permission_id};
  }

  for (let index = 0; index < Object.keys(rolePermissions).length; index++) {
    const roleId = Object.keys(rolePermissions)[index];
    if (roleId != 1) await assignPermissions(knex, roleId, rolePermissions[roleId]);
  }
};

/**
 * Assign permissions for the given role
 *
 * @param   {object}  knex
 * @param   {string}  role
 * @param   {array}   permissions
 *
 * @return  {void}
 */
async function assignPermissions(knex, role, permissions) {
  const roles = isNaN(role) ? (await knex.where('key', role).select('id').from('role')) : [{id: role}];
  const rolesPermissions = [];
  roles.forEach((role) => {
    Object.values(permissions).forEach((permission) => {
      rolesPermissions.push(
          {
            permission_id: permission.id,
            role_id: role.id,
            created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
            updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
          });
    });
  });
  await knex('role_permission').insert(rolesPermissions);
}

/**
 * Assign screen permissions for the given role
 *
 * @param   {object}  knex
 * @param   {string}  role
 * @param   {array}   screenPermissions
 *
 * @return  {void}
 */
async function assignScreenPermissions(knex, role, screenPermissions) {
  const roles = isNaN(role) ? (await knex.where('key', role).select('id').from('role')) : [{id: role}];
  const rolesPermissions = [];
  roles.forEach((role) => {
    screenPermissions.forEach((screenPermission) => {
      rolesPermissions.push(
          {
            screen_permission_id: screenPermission.id,
            role_id: role.id,
            created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
            updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
          });
    });
  });
  await knex('role_screen_permission').insert(rolesPermissions);
}
