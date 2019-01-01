const fs = require('fs')
const filePath =  __dirname + '/index.js'
const content = fs.readFileSync(filePath, 'utf8');

// console.log('contents',': ', contents);

const result = content.replace(/program/g,'app');

console.log('result',': ', result);


// fs.readFile(someFile, 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   const result = data.replace(/string to be replaced/g, 'replacement');

//   fs.writeFile(someFile, result, 'utf8', function (err) {
//      if (err) return console.log(err);
//   });
// });