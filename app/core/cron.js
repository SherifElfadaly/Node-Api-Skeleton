/**
 * cron Base class
 */
class Cron {
  /**
   * Constructor function
   */
  constructor() {
    return {
      time: this.constructor.cronTiming,
      job: this.constructor.job || `/usr/local/bin/node ${this.constructor.path || '/usr/src/app/cron.js'} ${this.constructor.name} 2>&1 >>/var/log/cron.log `,
      user: this.constructor.user || 'root',
    };
  }
}

module.exports = Cron;
