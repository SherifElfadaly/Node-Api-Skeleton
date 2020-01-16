exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('screen_permission', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.string('key', 100).notNullable();
    table.integer('screen_id').nullable().unsigned().defaultTo(0);
    table.string('permission_id', 100);
    table.boolean('deleted').defaultTo(0);
    table.foreign('screen_id').references('screen.id');
    table.timestamps();
  });

  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('screen_permission');
  return await knex.raw('SET foreign_key_checks = 1;');
};
