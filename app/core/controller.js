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
    this.repo = repo;
    this.modelName = this.constructor.name.replace('Controller', '');
    this.modelName = this.modelName.charAt(0).toLowerCase() + this.modelName.slice(1);

    // eslint-disable-next-line no-undef
    return new Proxy(this, {
      get: (controller, name) => {
        /**
         * Wrap every method with asyncWrapper exception handler.
         */
        const method = container.asyncWrapper(controller[name].bind(controller));

        // eslint-disable-next-line no-undef
        return new Proxy(method, {
          apply: async (controller, thisArg, argumentsList) => {
            try {
              /**
               * Check if the user is logged in.
               */
              if ( ! this.constructor.skipLoginCheck.includes(name)) {
                argumentsList[0].user = await container.auth.check(argumentsList[0].headers.authorization);
              }

              /**
               * Check if the user has permissions.
               */
              if ( ! this.constructor.skipPermissionCheck.includes(name) && argumentsList[0].user) {
                await container.auth.can(argumentsList[0].user.id, name, this.modelName);
              }

              return method(argumentsList[0], argumentsList[1], argumentsList[2]);
            } catch (err) {
              argumentsList[2](err);
            }
          },
        });
      },
    });
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
    return res.json(await this.repo.all(this.getModuleConfig('relations', 'all'), req.headers['sort-by'], req.headers['desc']));
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
    return res.json(await this.repo.find(req.params.id, this.getModuleConfig('relations', 'find')));
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
    return res.json(await this.repo.findBy(req.body,
        this.getModuleConfig('relations', 'findBy'), req.headers['sort-by'], req.headers['desc']));
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
    return res.json(await this.repo.paginate(req.params.page, req.params.perPage,
        this.getModuleConfig('relations', 'paginate'), req.headers['sort-by'], req.headers['desc']));
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
    return res.json(await this.repo.paginateBy(req.body, req.params.page, req.params.perPage,
        this.getModuleConfig('relations', 'paginateBy'), req.headers['sort-by'], req.headers['desc']));
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
    return res.json(await this.repo.deleted(req.body, req.params.page, req.params.perPage,
        req.headers['sort-by'], req.headers['desc']));
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
    return res.json(await this.repo.insert(req.body,
        this.getModuleConfig('allowedRelations', 'insert'), this.getModuleConfig('upsertOptions', 'insert')));
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
    return res.json(await this.repo.update(req.body,
        this.getModuleConfig('allowedRelations', 'update'), this.getModuleConfig('upsertOptions', 'update')));
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
    return res.json(await this.repo.delete(req.params.id));
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
    return res.json(await this.repo.hardDelete(req.params.id));
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
    return res.json(await this.repo.restore(req.params.id));
  }

  /**
   * Get requested module config based on the given route.
   *
   * @param   {string}  config
   *
   * @param   {string}  route
   *
   * @return  {string}
   */
  getModuleConfig(config, route) {
    const modelRelations = container.moduleConfig[this.modelName][config];

    return modelRelations ? modelRelations[route] || '[]' : '[]';
  }
}

module.exports = Controller;
