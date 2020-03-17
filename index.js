require('dotenv').config()

// super basic IP logger with micro
const {
  send,
  json
} = require('micro')
const mongoose = require('mongoose')
const IPModel = require('./models/IP')
const cors = require('micro-cors')()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', console.error.bind(console, '[mongodb] connection error:'))
db.once('open', () => console.log('[mongodb] connected'))

const main = async (req, res) => {
  try {
    // respond to OPTIONS requests for CORS
    if (req.method === 'OPTIONS') return send(res, 200, 'OK')

    // since we need to send the fpjs data, we shouldn't respond to anything but a POST and OPTIONS request
    if (req.method !== 'POST') return send(res, 405, 'Method Not Allowed')

    // Handle being behind CloudFlare (X-Forwarded-For should have the client IP)
    const ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (
        req.connection.socket ?
        req.connection.socket.remoteAddress :
        null
      )
    const userAgent = req.headers['user-agent'] || 'None'
    const fpjsInfo = await json(req)

    await IPModel.create({
      ip,
      userAgent,
      fpjsInfo
    })

    return send(res, 200, 'OK')
  } catch (error) {
    console.error("error logging:", error)
    return send(res, 500, 'Error')
  }
}

module.exports = cors(main)
