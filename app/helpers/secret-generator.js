/**
 * Secret generator class.
 */
class SecretGenerator {
  /**
    * Generate secret key.
    *
    * @return  {string}
    */
  static async generateSecret() {
    const buffer = await require('crypto').randomBytes(48);
    return buffer.toString('hex');
  }

  /**
    * Generate secret key for the app.
    *
    * @return  {string}
    */
  static async generateAppSecret() {
    const secret = await this.generateSecret();
    const fs = require('fs');

    /**
     * Read .env file.
     */
    fs.readFile(`${__dirname }/../../.env`, 'utf8', (err, data) => {
      let content = ``;
      /**
       * Parse string content of .env to json.
       */
      const conf = require('dotenv').parse(data);
      conf.APP_SECRET = secret;

      /**
       * Convert object back to string.
       */
      Object.keys(conf).forEach((key) => {
        content += `${key }=${ conf[key]}\n`;
      });

      if (err) {
        return console.log(err);
      }

      /**
       * Store the new .env config.
       */
      fs.writeFile(`${__dirname }/../../.env`, content, 'utf8', function(err) {
        if (err) return console.log(err);
      });
    });
  }
}

module.exports = SecretGenerator;
