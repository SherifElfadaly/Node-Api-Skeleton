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
   * @param   {boolean} trx
   *
   * @return  {array}
   */
  list(relations = '[]', conditions = false, page = 1, perPage = 15, sortBy = 'created_at', desc = true, trx = false) {
    return this.model.list(relations, conditions, page, perPage, sortBy, desc, trx);
  }

  /**
   * Fetch all records with relations.
   *
   * @param   {string}  relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   * @param   {string}  trx
   *
   * @return  {array}
   */
  all(relations = '[]', sortBy = 'created_at', desc = true, columns = '*', trx = false) {
    return this.model.all(relations, sortBy, desc, columns, trx);
  }

  /**
   * Fetch record based on the given id.
   *
   * @param   {number}  id
   * @param   {string}  relations
   * @param   {string}  columns
   * @param   {string}  trx
   *
   * @return  {object}
   */
  find(id, relations = '[]', columns = '*', trx = false) {
    return this.model.find(id, relations, columns, trx);
  }

  /**
   * Find first record with relations
   * based on the given conditions.
   *
   * @param   {object}  conditions
   * @param   {string}  relations
   * @param   {string}  columns
   * @param   {string}  trx
   *
   * @return  {array}
   */
  first(conditions, relations = '[]', columns = '*', trx = false) {
    return this.model.first(conditions, relations, columns, trx);
  }

  /**
   * Find first or create new record
   * based on the given conditions.
   *
   * @param   {object}  data
   * @param   {object}  trx
   *
   * @return  {array}
   */
  firstOrCreate(data, trx = false) {
    return this.model.firstOrCreate(data, trx);
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
   * @param   {string}  trx
   *
   * @return  {array}
   */
  findBy(conditions, relations = '[]', sortBy = 'created_at', desc = true, columns = '*', trx = false) {
    return this.model.findBy(conditions, relations, sortBy, desc, columns, trx);
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
   * @param   {string}  trx
   *
   * @return  {array}
   */
  paginate(page = 1, perPage = 15, relations = '[]', sortBy = 'created_at', desc = true, columns = '*', trx = false) {
    return this.model.paginate(page, perPage, relations, sortBy, desc, columns, trx);
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
   * @param   {string}  trx
   *
   * @return  {array}
   */
  paginateBy(conditions, page = 1, perPage = 15, relations = '[]', sortBy = 'created_at', desc = true, columns = '*', trx = false) {
    return this.model.paginateBy(conditions, page, perPage, relations, sortBy, desc, columns, trx);
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
   * @param   {string}  trx
   *
   * @return  {array}
   */
  deleted(conditions, page = 1, perPage = 15, sortBy = 'created_at', desc = true, columns = '*', trx = false) {
    return this.model.deleted(conditions, page, perPage, sortBy, desc, columns, trx);
  }

  /**
   * insert the given data.
   *
   * @param   {array}  data
   * @param   {string} allowedRelations
   * @param   {object} upsertOptions
   * @param   {object} trx
   *
   * @return  {object}
   */
  insert(data, allowedRelations = '[]', upsertOptions = {}, trx = false) {
    return this.model.insert(data, allowedRelations, upsertOptions, trx);
  }

  /**
   * Update the given data.
   *
   * @param   {array}  data
   * @param   {string} allowedRelations
   * @param   {object} upsertOptions
   * @param   {object} trx
   *
   * @return  {object}
   */
  update(data, allowedRelations = '[]', upsertOptions = {}, trx = false) {
    return this.model.update(data, allowedRelations, upsertOptions, trx);
  }

  /**
   * Delete record based on the given condition.
   *
   * @param   {number}  id
   * @param   {string}  attribute
   * @param   {string}  trx
   *
   * @return  {number}
   */
  delete(id, attribute = 'id', trx = false) {
    return this.model.delete(id, attribute, trx);
  }

  /**
   * Hard delete record based on the given condition.
   *
   * @param   {number}  id
   * @param   {string}  attribute
   * @param   {string}  trx
   *
   * @return  {number}
   */
  hardDelete(id, attribute = 'id', trx = false) {
    return this.model.hardDelete(id, trx);
  }

  /**
   * Restore deleted record based on the given condition.
   *
   * @param   {number}  id
   * @param   {string}  attribute
   * @param   {string}  trx
   *
   * @return  {object}
   */
  restore(id, attribute = 'id', trx = false) {
    return this.model.restore(id, attribute, trx);
  }

  /**
   * Start transaction.
   *
   * @return  {object}
   */
  startTransaction() {
    return this.model.startTransaction();
  }

  /**
   * Commit transaction.
   *
   * @param   {object}  trx
   *
   * @return  {void}
   */
  commitTransaction(trx) {
    return this.model.commitTransaction(trx);
  }

  /**
   * Rollback transaction.
   *
   * @param   {object}  trx
   *
   * @return  {void}
   */
  rollbackTransaction(trx) {
    return this.model.rollbackTransaction(trx);
  }
}

module.exports = Repository;
