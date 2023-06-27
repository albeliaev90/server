const { Schema, model } = require('mongoose')

const Admin = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    
}, {
    timestamps: true
})

module.exports = model('Admin', Admin)