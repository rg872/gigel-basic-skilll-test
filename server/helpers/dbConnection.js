const mongoose = require('mongoose')
// MONGOOSE WARNING
// urrent URL string parser is deprecated, and will be removed in a future version. 
// To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
const options = { useNewUrlParser: true }
const url = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds215172.mlab.com:15172/gigelbasic`

module.exports = {
  connectMongo () {
    mongoose.connect(url, options)

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Connection to db error:'));
    db.once('open', function() {
      console.log('Connection to db success')
    })
  }
}

