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
      job: this.constructor.job || `/usr/bin/node ${container.config.cron_path} ${this.constructor.name} 2>&1 >>/var/log/cron.log `,
      user: container.config.cron_user,
    };
  }
}

module.exports = Cron;
