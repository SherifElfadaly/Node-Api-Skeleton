exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('report', (table) => {
    table.increments('id');
    table.string('report_name').notNullable();
    table.string('view_name').notNullable();
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
  });
  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('report');
  return await knex.raw('SET foreign_key_checks = 1;');
};
