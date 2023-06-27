const { Schema, model } = require('mongoose')

const SiteOrder = new Schema({
    email: { type: String, default: '' },
    phone: { type: String, default: ''},
    name: { type: String, default: '' },
    claimText: { type: String, default: '' },
    isViewed:{type:Boolean, default:false}

}, {
    timestamps: true
})

module.exports = model('SiteOrder', SiteOrder)