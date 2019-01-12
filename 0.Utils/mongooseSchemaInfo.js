const mongoose = require('mongoose');

const shutDownGracefuly = require('./shutDownGracefully');

console.clear();

const mongooseConnect = require('./mongooseConnect')

mongooseConnect('myList');
// mongooseConnect(databaseName);

const Model = require('./models/User');

const schemaPaths = Model.schema.paths

for (let key in schemaPaths){
    console.log('key',': ',key,"=> ", schemaPaths[key].instance);
    
}


shutDownGracefuly();


