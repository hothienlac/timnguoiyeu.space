const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
const handlebars = require('handlebars')
const fs = require('fs');
const path = require('path');


const loadTemplate = async (templateName, data) => {
  const content = fs.readFileSync(
      path.join(__dirname, './email-template/' + templateName + '.html'),
  ).toString();
  const inject = handlebars.compile(content);
  const result = inject(data);
  const subject = result.substr(0, result.indexOf('\n'));
  const html = result.substring(result.indexOf('\n') + 1);
  return {
    subject,
    html,
  };
};


const AWS_SES = new AWS.SES({
  "accessKeyId": process.env.AWS_SES_accessKeyId,
  "secretAccessKey": process.env.AWS_SES_secretAccessKey,
  "region": process.env.AWS_SES_region,
});


const sendEmail = async (recipientEmail, template) => {
  let params = {
    Source: 'no-repy@timnguoiyeu.space',
    Destination: {
      ToAddresses: [
        recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: template.html,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: template.subject,
      }
    },
  };
  const sent = await AWS_SES.sendEmail(params).promise();
  return sent;
};


module.exports = {
  loadTemplate,
  sendEmail,
}
