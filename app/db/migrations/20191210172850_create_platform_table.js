exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('platform', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.string('key', 100).notNullable();
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
    table.unique(['key']);
  });

  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('platform');
  return await knex.raw('SET foreign_key_checks = 1;');
};
