exports.up = async (knex, Promise) => {
  await knex.raw(`CREATE VIEW roles_count AS  
    select r.name as role_name, count(u.id)
    from user u, role r ,user_role ur
    where
    ur.user_id  = u.id and
    ur.role_id = r.id 
    group by role_name
    `);

  await knex('report').insert([
    {
      report_name: 'roles_count',
      view_name: 'roles_count',
      created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
      updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    },
  ]);
};

exports.down = async (knex, Promise) => {
  await knex.raw('DROP VIEW IF EXISTS roles_count');
};
