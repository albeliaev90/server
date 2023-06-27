const { Schema, model } = require('mongoose')

const MailsRecipient = new Schema({
    email: { type: String, default: '' },
    
},)

module.exports = model('MailsRecipient', MailsRecipient)