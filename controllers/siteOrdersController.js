const mailService = require('../mailService/mailService');
const MailsRecipient = require('../models/MailsRecipient');
const SiteOrder = require('../models/siteOrder')

class SiteOrdersController {

  async createOrder(req, res) {
    try {


      const { email,
        phone,
        name,
        claimText, isCallType } = req.body
      const order = new SiteOrder({
        email,
        phone,
        name,
        claimText
      })
      
      await order.save()
      if(!isCallType){
        const arr=[{name:"Имя", value:name},{name:"Телефон", value:phone},{name:"Почта", value:email},{name:"Претензия", value:claimText},]
        const emails = await MailsRecipient.find()
        // console.log(emails);
  
        for (let i = 0; i < emails.length; i++) {
         
          await mailService.sendMail(emails[i].email, 'Новая претензия', arr)
  
        }
      }
      return res.status(200).json({ message: "Ваша заявка принята в обработку, ожидайте звонок по номеру, указанному в заявке" })
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Ошибка при создании заявки" })
    }
  }
  async getOrdersList(req, res) {
    const { page, limit, isFreshFirst } = req.query;
    const sortOption = isFreshFirst === 'yes' ? { createdAt: -1 } : { createdAt: 1 };

    try {

      // Определение сортировки


      // Формирование запроса в базу данных
      const ordersList = await SiteOrder.find({})
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(Number(limit));
      // определение сколько вообще есть юзеров
      const ordersListLength = (await SiteOrder.find()).length
      return res.status(200).json({ ordersListLength, ordersList });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ ...error });
    }
  }

  async createContract(req, res) {
    const arr = req.body;

    const info = arr ? [
      { name: 'Номер договора:', value: arr[0] },
      { name: 'e-mail:', value: arr[1] },
      { name: 'номер телефона:', value: arr[2] },
      { name: 'Фамилия:', value: arr[3] },
      { name: 'Имя:', value: arr[4] },
      { name: 'Отчество:', value: arr[5] },
      { name: 'Дата рождения:', value: arr[6] },
      { name: 'документ, удостоверяющего личность:', value: arr[7] },
      { name: 'Серия и номер документа:', value: arr[8] },
      { name: 'Дата выдачи документа:', value: arr[9] }, { name: 'Кем выдан документ:', value: arr[10] },] : []

    try {
      const emails = await MailsRecipient.find()
      // console.log(emails);

      for (let i = 0; i < emails.length; i++) {
        console.log("email",emails[i].email);
        await mailService.sendMail(emails[i].email, 'Новый контракт', info)

      }


      
      return res.status(200).json('ok');
    } catch (error) {
      console.log(error);

      return res.status(400).json({ ...error });
    }
  }
}
module.exports = new SiteOrdersController()