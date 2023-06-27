const nodemailer = require('nodemailer')

const successVerifHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Email подтвержден</title>
    <style>
      body {
        background-color: #1d1d1d;
        color: #fff;
        font-family: sans-serif;
        font-size: 18px;
        text-align: center;
        padding-top: 100px;
      }
      a {
        color: #fff;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>Ваш email подтвержден</h1>
    <p>Вы можете перейти на сайт, нажав на ссылку:</p>
    <p><a href="https://jasper935.github.io/miraplay_client_side/">Перейти на сайт</a></p>
  </body>
</html>
`

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({

      host: "smtp.beget.com",
      port: 465,
      // authentication: "GTt64Wf45h7@5",
      auth: {
        user: "support@alexeeva-law.ru",
        pass: 'GTt64Wf45h7@5'
      },
    })
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'support@alexeeva-law.ru',
      to,
      subject: 'new',
      text: '',
      html: `
        <h3>Для активации email перейдите по ссылке:</h3>
        <p><a href="${link}" >ПОДТВЕРДИТЬ EMAIL</a></p>
     `
    })
  }
  async sendMail(to, subject, arr) {
    let list = []
    arr.forEach(element => {
      list.push(`<li> ${element.name} ${element.value}</li>`)
    });
    await this.transporter.sendMail({
      from: 'support@alexeeva-law.ru',
      to,
      subject: subject,
      text: '',
      html: `
        <h3>${subject}</h3>
        <ul>  
       ${list.join(' ')}    
        </ul>
     `
    })
  }

}
module.exports = new MailService()