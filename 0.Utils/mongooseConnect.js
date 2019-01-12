const mongoose = require('mongoose');

function mongooseConnect(databaseName) {
  mongoose.connect(`mongodb://localhost:27017/${databaseName}`);
  mongoose.connection.on('connected', () => {
    console.log('connected to mongod');
  });
  
  mongoose.connection.on('error', () => {
    console.log('failed to connect to mongod');
  });
}

module.exports = mongooseConnect;