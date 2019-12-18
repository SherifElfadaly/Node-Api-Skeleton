const Cron = container.cron;
/**
 * replaceToken class.
 */
class replaceToken extends Cron {
  /**
   * Init constructor function
   */
  constructor() {
    super();
  }

  /**
   * Return timing for the cron.
   * Change to change cron task exec time.
   * Cron time format-> m h  dom mon dow
   * @return  {string}
   */
   static cronTiming = '00 12 * * *';

   /**
    * Set another job outside of node
    * It will register the job to the cron tab
    * It won't exec the run method
    * DONT UNCOMMENT UNLESS YOU NEED
    */
   // static job = 'curl localhost:3000';

   /**
    * Run task on cronTiming exec time .
    *
    * @return  {void}
    */
   static async run() {
     // Write you logic here.
   }
}

module.exports = replaceToken;
