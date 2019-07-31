
exports.up = (knex, Promise) => {
  return knex.schema.createTable('roles_permissions', (table) => {
    table.increments('id');
    table.integer('role_id').notNullable().unsigned();
    table.integer('permission_id').notNullable().unsigned();
    table.unique(['role_id', 'permission_id']);
    table.foreign('role_id').references('roles.id');
    table.foreign('permission_id').references('permissions.id');
    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('roles_permissions');
};
