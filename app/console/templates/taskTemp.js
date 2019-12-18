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
    * Set the path to cron js
    * By default it's /usr/src/app/cron.js
    * you can override it with the absolute cron.js Path in your environment
    */
   // static path = '/home/daviid/Projects/node_api_skeleton/cron.js';

   /**
    * Set the cron user
    * The default is root
    * Uncomment if you wana change it
    */
   // static user = 'root';

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
