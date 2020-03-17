const { model, Schema } = require('mongoose')

const IPSchema = new Schema({
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    fpjsInfo: {
        type: Array,
        required: true
    }
}, { timestamps: true, versionKey: false, skipVersioning: true })

module.exports = new model('IP', IPSchema)