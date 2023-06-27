const { Schema, model } = require('mongoose')

const User = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    IDappeal:{ type: String, default: '' },
    companyName:{ type: String, default: '' },
    bank:{ type: String, default: '' },
    transactions:[{ type: String, default: '' }],
    clientUpdateDate:{type:Date}
}, {
    timestamps: true
})

module.exports = model('User', User)