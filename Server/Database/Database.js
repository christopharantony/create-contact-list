const mongoose = require('mongoose')
require('dotenv').config()

const Connect = () => {
    try {
        console.log(process.env.MONGOURL)
        mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err.messag4)
    }
}

module.exports = Connect;