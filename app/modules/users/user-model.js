const password = require('objection-password')();
const Model = password(container.Model);

/**
 * User model
 */
class UserModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'user';

  /**
   * Return model relations.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      roles: {
        relation: container.Model.ManyToManyRelation,
        modelClass: container.role,
        join: {
          from: 'user.id',
          through: {
            from: 'user_role.user_id',
            to: 'user_role.role_id',
            extra: ['created_at', 'updated_at'],
          },
          to: 'role.id',
        },
      },
    };
  }
}

module.exports = UserModel;
