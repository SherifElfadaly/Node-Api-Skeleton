/**
 * global vairables for express route to work.
 */
let globalRepo;
let globalGetRelations;
let modelName;

/**
 * Controller class.
 */
class Controller {
  /**
     * Init new object.
     *
     * @param   {object}  repo
     *
     * @return  {void}
     */
  constructor(repo) {
    globalRepo = repo;
    globalGetRelations = this.getRelations;
    modelName = container.noCase(this.constructor.name, null, '_').split('_')[0];
  }

  /**
   * Fetch all records from the repo.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {array}
   */
  async all(req, res) {
    return res.json(await globalRepo.all(globalGetRelations('all'), req.params.sortBy, req.params.desc));
  }

  /**
   * Find record from the repo based on the given id.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async find(req, res) {
    return res.json(await globalRepo.find(req.params.id, globalGetRelations('find')));
  }

  /**
   * Fetch all records from the repo based on the given conditions.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {array}
   */
  async findBy(req, res) {
    return res.json(await globalRepo.findBy(req.body, globalGetRelations('findBy'), req.params.sortBy, req.params.desc));
  }

  /**
   * Paginate records from the repo.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {array}
   */
  async paginate(req, res) {
    return res.json(await globalRepo.paginate(req.params.page, req.params.perPage,
        globalGetRelations('paginate'), req.params.sortBy, req.params.desc));
  }

  /**
   * Paginate records from the repo based on the given conditions.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {array}
   */
  async paginateBy(req, res) {
    return res.json(await globalRepo.paginateBy(req.body, req.params.page, req.params.perPage,
        globalGetRelations('paginateBy'), req.params.sortBy, req.params.desc));
  }

  /**
   * Paginate deleted records based on the given conditions.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {array}
   */
  async deleted(req, res) {
    return res.json(await globalRepo.deleted(req.body, req.params.page, req.params.perPage, req.params.sortBy, req.params.desc));
  }

  /**
   * Insert the given data.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async insert(req, res) {
    return res.json(await globalRepo.insert(req.body));
  }

  /**
   * Update the given data.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async update(req, res) {
    return res.json(await globalRepo.update(req.body));
  }

  /**
   * Delete record from the repo based on the given id.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async delete(req, res) {
    return res.json(await globalRepo.delete(req.params.id));
  }

  /**
   * Hard delete record from the repo based on the given id.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async hardDelete(req, res) {
    return res.json(await globalRepo.hardDelete(req.params.id));
  }

  /**
   * Restore deleted record from the repo based on the given id.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async restore(req, res) {
    return res.json(await globalRepo.restore(req.params.id));
  }

  /**
   * Get relations based on the given route.
   *
   * @param   {string}  route
   *
   * @return  {string}
   */
  getRelations(route) {
    const modelRelations = container.relations[modelName];

    return modelRelations ? modelRelations[route] || '[]' : '[]';
  }
}

module.exports = Controller;
