exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('oauth_auth_code', (table) => {
    table.string('id', 100).primary();
    table.datetime('expires_at').notNullable();
    table.string('scope', 100).nullable();
    table.text('redirect_uri').notNullable();
    table.integer('user_id').notNullable().unsigned();
    table.integer('client_id').notNullable().unsigned();
    table.foreign('user_id').references('user.id');
    table.foreign('client_id').references('oauth_client.id');
    table.timestamps();
  });
  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('oauth_auth_code');
  return await knex.raw('SET foreign_key_checks = 1;');
};
