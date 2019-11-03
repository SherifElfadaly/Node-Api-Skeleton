/**
 * Repository class.
 */
class Repository {
  /**
   * Init new object
   *
   * @param   {object}  model
   *
   * @return  {void}
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Fetch records with relations based on the given params.
   *
   * @param   {string}  relations
   * @param   {object}  conditions
   * @param   {number}  page
   * @param   {number}  perPage
   * @param   {string}  sortBy
   * @param   {boolean} desc
   *
   * @return  {array}
   */
  list(relations = '[]', conditions = false, page = 1, perPage = 15, sortBy = 'created_at', desc = true) {
    return this.model.list(relations, conditions, page, perPage, sortBy, desc);
  }

  /**
   * Fetch all records with relations.
   *
   * @param   {string}  relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  all(relations = '[]', sortBy = 'created_at', desc = true, columns = '*') {
    return this.model.all(relations, sortBy, desc, columns);
  }

  /**
   * Fetch record based on the given id.
   *
   * @param   {number}  id
   * @param   {string}  relations
   * @param   {string}  columns
   *
   * @return  {object}
   */
  async find(id, relations = '[]', columns = '*') {
    return this.model.find(id, relations, columns);
  }

  /**
   * Find first record with relations
   * based on the given conditions.
   *
   * @param   {object}  conditions
   * @param   {string}  relations
   * @param   {string}  columns
   *
   * @return  {array}
   */
  first(conditions, relations = '[]', columns = '*') {
    return this.model.first(conditions, relations, columns);
  }

  /**
   * Find first or create new record
   * based on the given conditions.
   *
   * @param   {object}  data
   *
   * @return  {array}
   */
  async firstOrCreate(data) {
    return this.model.firstOrCreate(data);
  }

  /**
   * Find all records with relations
   * based on the given conditions.
   *
   * @param   {object}  conditions
   * @param   {string}  relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  findBy(conditions, relations = '[]', sortBy = 'created_at', desc = true, columns = '*') {
    return this.model.findBy(conditions, relations, sortBy, desc, columns);
  }

  /**
   * Paginate records with relations.
   *
   * @param   {number}  page
   * @param   {number}  perPage
   * @param   {string}  relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  paginate(page = 1, perPage = 15, relations = '[]', sortBy = 'created_at', desc = true, columns = '*') {
    return this.model.paginate(page, perPage, relations, sortBy, desc, columns);
  }

  /**
   * Paginate records with relations
   * based on the given conditions.
   *
   * @param   {object}  conditions
   * @param   {number}  page
   * @param   {number}  perPage
   * @param   {string}  relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  paginateBy(conditions, page = 1, perPage = 15, relations = '[]', sortBy = 'created_at', desc = true, columns = '*') {
    return this.model.paginateBy(conditions, page, perPage, relations, sortBy, desc, columns);
  }

  /**
   * Paginate deleted records based on the given conditions.
   *
   * @param   {object}  conditions
   * @param   {number}  page
   * @param   {number}  perPage
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  deleted(conditions, page = 1, perPage = 15, sortBy = 'created_at', desc = true, columns = '*') {
    return this.model.deleted(conditions, page, perPage, sortBy, desc, columns);
  }

  /**
   * insert the given data.
   *
   * @param   {array}  data
   * @param   {string} allowedRelations
   * @param   {object} upsertOptions
   * @param   {object} transaction
   *
   * @return  {object}
   */
  async insert(data, allowedRelations = '[]', upsertOptions = {}, transaction = false) {
    return this.model.insert(data, allowedRelations, upsertOptions, transaction);
  }

  /**
   * Update the given data.
   *
   * @param   {array}  data
   * @param   {string} allowedRelations
   * @param   {object} upsertOptions
   * @param   {object} transaction
   *
   * @return  {object}
   */
  async update(data, allowedRelations = '[]', upsertOptions = {}, transaction = false) {
    return this.model.update(data, allowedRelations, upsertOptions, transaction);
  }

  /**
   * Delete record based on the given condition.
   *
   * @param   {number}  id
   * @param   {string}  attribute
   *
   * @return  {number}
   */
  delete(id, attribute = 'id') {
    return this.model.delete(id, attribute);
  }

  /**
   * Hard delete record based on the given condition.
   *
   * @param   {number}  id
   * @param   {string}  attribute
   *
   * @return  {number}
   */
  hardDelete(id, attribute = 'id') {
    return this.model.hardDelete(id);
  }

  /**
   * Restore deleted record based on the given condition.
   *
   * @param   {number}  id
   * @param   {string}  attribute
   *
   * @return  {object}
   */
  restore(id, attribute = 'id') {
    return this.model.restore(id, attribute);
  }
}

module.exports = Repository;
