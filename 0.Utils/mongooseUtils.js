const mongoose = require('mongoose');

function connect(databaseName) {
  mongoose.connect(`mongodb://localhost:27017/${databaseName}`);
  mongoose.connection.on('connected', () => {
    console.log('connected to mongod');
  });
  
  mongoose.connection.on('error', () => {
    console.log('failed to connect to mongod');
  });
}

function getSchemaFields(Model){
  const schemaPaths = Model.schema.paths
  const result = []
  for (let key in schemaPaths){
      // console.log('key',': ',key,"=> ", schemaPaths[key].instance);
      const field = {field:key, type:schemaPaths[key].instance}        
      result.push(field);
  }    
  return result;
}

function shutDownGracefuly() {
  process.on('SIGINT', function () {
    console.log("Shutting down gracefuly.");
    setTimeout(function(){
      console.clear();
      process.exit();
    }, 800);
  });
}

module.exports = {connect, getSchemaFields, shutDownGracefuly};