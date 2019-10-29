exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('oauth_refresh_token', (table) => {
    table.string('id', 100).primary();
    table.datetime('expires_at').notNullable();
    table.boolean('deleted').defaultTo(0);
    table.string('access_token').notNullable();
    table.foreign('access_token').references('oauth_access_token.id');
    table.timestamps();
  });
  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('oauth_refresh_token');
  return await knex.raw('SET foreign_key_checks = 1;');
};
