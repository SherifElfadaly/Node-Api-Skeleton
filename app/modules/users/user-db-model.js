const password = require('objection-password')();
const DBModel = password(container.DBModel);

/**
 * User model
 */
class UserModel extends DBModel {
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
        relation: DBModel.ManyToManyRelation,
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
