const Repository = container.repository;

/**
 * ScreenRepository repository
 */
class ScreenRepository extends Repository {
  /**
   * Init new object
   *
   * @param   {object}  model
   *
   * @return  {void}
   */
  constructor(model) {
    super(model);
  }

  /**
   * Fetch all records with relations.
   *
   * @param   {string}  platform
   * @param   {string}  relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  async all(platform = '', relations = '[]', sortBy = 'created_at', desc = true, columns = '*') {
    platform = (await container.platformRepository.first({'platform.key': platform})) || {id: 0};
    const query = super.all(relations, sortBy, desc, columns);
    query.where('parent_id', null).where('platform_id', platform.id);

    return query;
  }
}

module.exports = ScreenRepository;
