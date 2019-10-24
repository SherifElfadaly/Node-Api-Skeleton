const Model = container.Model;

/**
 * RolesCount model
 */
class RolesCountModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'roles_count';

  /**
   * Return model relations.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      role: {
        relation: container.Model.BelongsToOneRelation,
        modelClass: container.role,
        join: {
          from: 'roles_count.role_id',
          to: 'role.id',
        },
      },
    };
  }
}

module.exports = RolesCountModel;
