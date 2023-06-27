const { Schema, model } = require('mongoose')

const Transaction = new Schema({
    amount: { type: String, default: '' },
    currency: { type: String, default: '' },
    accountNumber: { type: String, default: '' },
    status:{ type: String, default: 'frozen' },//frozen, done. pending
    ownerId:{type: String, default: '' },
    
}, {
    timestamps: true
})

module.exports = model('Transaction', Transaction)