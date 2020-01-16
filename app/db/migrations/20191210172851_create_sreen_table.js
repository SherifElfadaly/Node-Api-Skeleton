exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('screen', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.string('key', 100).notNullable();
    table.integer('parent_id').nullable().unsigned();
    table.integer('platform_id').nullable().unsigned();
    table.boolean('deleted').defaultTo(0);
    table.foreign('parent_id').references('screen.id');
    table.foreign('platform_id').references('platform.id');
    table.timestamps();
  });

  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('screen');
  return await knex.raw('SET foreign_key_checks = 1;');
};
