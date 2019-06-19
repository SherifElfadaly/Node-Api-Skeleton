/**
 * Repository class.
 */
class Repository {
  /**
   * Fetch all records with relations.
   *
   * @param   {array}   relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  all(relations = [], sortBy = 'created_at', desc = true, columns = '*') {
    const sort = desc ? 'desc' : 'asc';

    return this.model.query().
        eager(relations).
        select(columns).
        orderBy(sortBy, sort);
  }

  /**
   * Fetch record based on the given id.
   *
   * @param   {number}  id
   * @param   {array}   relations
   * @param   {string}  columns
   *
   * @return  {object}
   */
  find(id, relations = [], columns = '*') {
    return this.model.query().
        eager(relations).
        findById(id).
        select(columns);
  }

  /**
   * Paginate all records with relations.
   *
   * @param   {number}  page
   * @param   {number}  perPage
   * @param   {array}   relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  paginate(page = 1, perPage = 15, relations = [], sortBy = 'created_at', desc = true, columns = '*') {
    const sort = desc ? 'desc' : 'asc';

    return this.model.query().
        eager(relations).
        limit(perPage).
        offset(page - 1).
        select(columns).
        orderBy(sortBy, sort);
  }

  /**
   * Paginate all records with relations
   * based on the given conditions.
   *
   * @param   {object}  conditions
   * @param   {number}  page
   * @param   {number}  perPage
   * @param   {array}   relations
   * @param   {string}  sortBy
   * @param   {boolean} desc
   * @param   {string}  columns
   *
   * @return  {array}
   */
  paginateBy(conditions, page = 1, perPage = 15, relations = [], sortBy = 'created_at', desc = true, columns = '*') {
    const sort = desc ? 'desc' : 'asc';
    conditions = this.constructConditions(conditions, this.model);

    return this.model.query().
        eager(relations).
        whereRaw(conditions.conditionString, conditions.conditionValues).
        limit(perPage).
        offset(page - 1).
        select(columns).
        orderBy(sortBy, sort);
  }

  /**
   * Build the conditions recursively for the retrieving methods.
   *
   * @param   {array}  conditions
   * @param   {object}  model
   *
   * @return  {string}
   */
  constructConditions(conditions, model) {
    let conditionString = '';
    let conditionValues = [];
    Object.keys(conditions).forEach((key) => {
      let value = conditions[key];
      if (key.includes('.')) {
        key = this.wrapJsonSelector(key);
      }

      if (key == 'and') {
        conditions = this.constructConditions(value, model);
        conditionString += conditions['conditionString'].replace('{op}', 'and')+' {op} ';
        conditionValues = conditionValues.concat(conditions['conditionValues']);
      } else if (key == 'or') {
        conditions = this.constructConditions(value, model);
        conditionString += conditions['conditionString'].replace('{op}', 'or')+' {op} ';
        conditionValues = conditionValues.concat(conditions['conditionValues']);
      } else {
        let operator;
        let value1;
        let value2;
        if (value instanceof Object) {
          operator = value['op'];
          if (operator.toLowerCase == 'between') {
            value1 = value['val1'];
            value2 = value['val2'];
          } else {
            value = value['val'];
          }
        } else {
          operator = '=';
        }

        if (operator.toLowerCase == 'between') {
          conditionString += key+' >= ? and ';
          conditionValues.push(value1);
          conditionString += key+' <= ? {op} ';
          conditionValues.push(value2);
        } else if (operator.toLowerCase == 'in') {
          conditionValues = conditionValues.concat(value);
          const inBindingsString = '?,'.repeat(value.length).slice(0, -1);
          conditionString += key+' in ('+inBindingsString.slice(0, -1)+') {op} ';
        } else if (operator.toLowerCase == 'null') {
          conditionString += key+' is null {op} ';
        } else if (operator.toLowerCase == 'not null') {
          conditionString += key+' is not null {op} ';
        } else if (operator.toLowerCase == 'has') {
          const sql = model.withTrashed().has(key).toSql();
          conditions = this.constructConditions(value, model.key().getRelated());
          conditionString += sql.substr(sql.indexOf('exists')).slice(0, -1)+' and '+conditions['conditionString']+') {op} ';
          conditionValues = conditionValues.concat(conditions['conditionValues']);
        } else {
          conditionString += key+' '+operator+' ? {op} ';
          conditionValues.push(value);
        }
      }
    });

    conditionString = '('+conditionString.slice(0, -5)+')';
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
      return '"'+part+'"';
    }).join('.'));

    return removeLast === -1 ? result : result+')';
  }
}

module.exports = Repository;
