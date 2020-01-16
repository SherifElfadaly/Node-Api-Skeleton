exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('role_screen_permission', (table) => {
    table.increments('id');
    table.integer('role_id').nullable().unsigned().defaultTo(0);
    table.integer('screen_permission_id').nullable().unsigned().defaultTo(0);
    table.boolean('deleted').defaultTo(0);
    table.foreign('role_id').references('role.id');
    table.foreign('screen_permission_id').references('screen_permission.id');
    table.timestamps();
  });

  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('role_screen_permission');
  return await knex.raw('SET foreign_key_checks = 1;');
};
