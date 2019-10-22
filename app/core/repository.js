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
    const query = this.prepareEager(relations);
    const sort = JSON.parse(desc) ? 'desc' : 'asc';

    return query.
        whereNotDeleted().
        select(columns).
        orderBy(sortBy, sort);
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
    const query = this.prepareEager(relations);
    const model = query.
        whereNotDeleted().
        findById(id).
        select(columns);

    if (! model) container.errorHandlers.notFound();

    return model;
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
    const query = this.prepareEager(relations);
    conditions = this.constructConditions(conditions);

    return query.
        whereNotDeleted().
        whereRaw(conditions.conditionString, conditions.conditionValues).
        select(columns).
        first();
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
    const conditions = {and: {}};
    Object.keys(data).forEach((key) => {
      conditions['and'][key] = data[key];
    });

    let model = await this.first(conditions);
    if ( ! model) {
      model = await container.userRepository.insert(data);
    }

    return model;
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
    const query = this.prepareEager(relations);
    const sort = JSON.parse(desc) ? 'desc' : 'asc';
    conditions = this.constructConditions(conditions);

    return query.
        whereNotDeleted().
        whereRaw(conditions.conditionString, conditions.conditionValues).
        select(columns).
        orderBy(sortBy, sort);
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
    const query = this.prepareEager(relations);
    const sort = JSON.parse(desc) ? 'desc' : 'asc';

    return query.
        whereNotDeleted().
        page(page - 1, perPage).
        select(columns).
        orderBy(sortBy, sort);
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
    const query = this.prepareEager(relations);
    const sort = JSON.parse(desc) ? 'desc' : 'asc';
    conditions = this.constructConditions(conditions);

    return query.
        whereNotDeleted().
        whereRaw(conditions.conditionString, conditions.conditionValues).
        page(page - 1, perPage).
        select(columns).
        orderBy(sortBy, sort);
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
    const sort = JSON.parse(desc) ? 'desc' : 'asc';
    conditions = this.constructConditions(conditions);

    return this.model.query().
        whereDeleted().
        whereRaw(conditions.conditionString, conditions.conditionValues).
        page(page - 1, perPage).
        select(columns).
        orderBy(sortBy, sort);
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
    const model = await container.transaction(container.knex, (trx) => {
      trx = transaction || trx;
      const query = this.model.query(trx);
      if (allowedRelations !== '[]') query.allowInsert(allowedRelations);

      return query.insertGraph(data, upsertOptions);
    });

    return model;
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
    const model = await container.transaction(container.knex, (trx) => {
      trx = transaction || trx;
      const query = this.model.query(trx);
      if (allowedRelations !== '[]') query.allowUpsert(allowedRelations);

      return query.upsertGraph(data, upsertOptions);
    });

    return model;
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
    return this.model.query().where(attribute, id).delete();
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
    return this.model.query().where(attribute, id).hardDelete();
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
    return this.model.query().where(attribute, id).undelete();
  }

  /**
   * Build the conditions recursively for the retrieving methods.
   *
   * @param   {array}  conditions
   * @param   {object}  model
   *
   * @return  {string}
   */
  constructConditions(conditions) {
    let result;
    let conditionString = '';
    let conditionValues = [];

    Object.keys(conditions).forEach((key) => {
      let value = conditions[key];

      /**
       * Transform dot notation column to sql json selector.
       */
      if (key.includes('->')) {
        key = this.wrapJsonSelector(key);
      }

      /**
       * Wrap the condition in and / or then construct
       * the condition recursively to handle nested and / or.
       */
      if (key == 'and') {
        result = this.constructConditions(value);
        conditionString += `${result['conditionString'].replace(/{op}/g, 'and')}  {op} `;
        conditionValues = conditionValues.concat(result['conditionValues']);
      } else if (key == 'or') {
        result = this.constructConditions(value);
        conditionString += `${result['conditionString'].replace(/{op}/g, 'or')} {op} `;
        conditionValues = conditionValues.concat(result['conditionValues']);
      } else {
        let operator;
        let value1;
        let value2;

        /**
         * Handle between op and fall back to equal if value
         * isn't object.
         */
        if (value instanceof Object) {
          operator = value['op'];
          if (operator.toLowerCase() == 'between') {
            value1 = value['val1'];
            value2 = value['val2'];
          } else {
            value = value['val'];
          }
        } else {
          operator = '=';
        }

        /**
         * Construct condition string based on the given key
         * and supply values for each operation.
         */
        if (operator.toLowerCase() == 'between') {
          conditionString += `${key} >= ? and `;
          conditionValues.push(value1);
          conditionString += `${key} <= ? {op} `;
          conditionValues.push(value2);
        } else if (operator.toLowerCase() == 'in') {
          conditionValues = conditionValues.concat(value);
          const inBindingsString = '?,'.repeat(value.length);
          conditionString += `${key} in (${inBindingsString.slice(0, -1)}) {op} `;
        } else if (operator.toLowerCase() == 'null') {
          conditionString += `${key} is null {op} `;
        } else if (operator.toLowerCase() == 'not null') {
          conditionString += `${key} is not null {op} `;
        } else {
          conditionString += `${key} ${operator} ? {op} `;
          conditionValues.push(value);
        }
      }
    });

    conditionString = `(${conditionString.slice(0, -5)})`;
    return {'conditionString': conditionString, 'conditionValues': conditionValues};
  }

  /**
   * Wrap the given JSON selector.
   *
   * @param   {string}  value
   *
   * @return  {string}
   */
  wrapJsonSelector(value) {
    const removeLast = value.indexOf(')');
    value = removeLast === -1 ? value : value.substr(0, removeLast);
    const path = value.split('.');
    const field = path.shift();
    const result = container.sprintf('%s->\'$.%s\'', field, path.map(function(part) {
      return `"${part}"`;
    }).join('.'));

    return removeLast === -1 ? result : `${result})`;
  }

  /**
   * Prepare query with eager relations.
   *
   * @param   {string}  relations
   *
   * @return  {object}
   */
  prepareEager(relations) {
    const query = this.model.query();
    if (relations['eager']) {
      query.eager(relations['eager'], relations['callback']);
    } else {
      query.eager(relations);
    }

    return query;
  }
}

module.exports = Repository;
