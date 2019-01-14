//configuring mongoose 
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/recipes`);
mongoose.connection.on('connected', () => {
    console.log('connected to mongod');
    console.log('-------------------------------');
});
mongoose.connection.on('error', () => {
    console.log('failed to connect to mongod');
});