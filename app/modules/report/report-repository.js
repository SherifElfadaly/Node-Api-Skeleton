const Repository = container.repository;

/**
 * ReportRepository repository
 */
class ReportRepository extends Repository {
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
    * Get deductions for the logged in user.
    *
    * @param   {object}  user
    * @param   {string}  reportName
    * @param   {object}  conditions
    * @param   {number}  page
    * @param   {number}  perPage
    * @param   {string}  sortBy
    * @param   {boolean} desc
    *
    * @return  {object}
    */
  async getReport(user, reportName, conditions = {}, page = 1, perPage = 0, sortBy = false, desc = true) {
    let report = await this.first({report_name: reportName});
    const sort = JSON.parse(desc) ? 'desc' : 'asc';

    if ( ! report) container.errorHandlers.notFound('report');

    /**
     * Check if the user has permissions to view the report.
     */
    await container.auth.can(user, report.view_name, 'report');

    report = container.knex(report.view_name);

    /**
     * Add conditions filters if provided.
     */
    if (Object.keys(conditions).length) {
      conditions = this.constructConditions(conditions);
      report.whereRaw(conditions.conditionString, conditions.conditionValues);
    }

    /**
     * Limit result based on the given inputs.
     */
    if (perPage) {
      report.limit(perPage).offset((page - 1) * perPage);
    }

    /**
     * Sort result based on the given inputs.
     */
    if (sortBy) {
      report.orderBy(sortBy, sort);
    }

    return report;
  }
}

module.exports = ReportRepository;
