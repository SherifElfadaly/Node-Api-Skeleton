/**
 * Mail class.
 */
class Mail {
  /**
    * Create new mail object.
    *
    * @param   {object}  mailer
    *
    * @return  {void}
    */
  constructor(mailer) {
    this.mailer = mailer;
  }

  /**
    * Send email
    *
    * @param   {string}  email
    * @param   {string}  subject
    * @param   {object}  data
    * @param   {string}  htmlTemplate
    *
    * @return  {void}
    */
  async send(email, subject, data, htmlTemplate) {
    data.app_name = container.config.app_name;
    htmlTemplate = container.fs.readFileSync(`${__dirname }/templates/${htmlTemplate}.html`, 'utf8');
    htmlTemplate = container.ejs.render(htmlTemplate, data);

    const msg = {
      to: email,
      from: container.config.email_from,
      subject: subject,
      html: htmlTemplate,
    };
    await this.mailer.send(msg);
  }
}
module.exports = Mail;
