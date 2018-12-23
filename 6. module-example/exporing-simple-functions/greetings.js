// greetings.js
// var exports = module.exports = {};

const sayHelloInEnglish = function() {
    console.log("hello");
    return "HELLO";
  };
  
const sayHelloInSpanish = function() {
  console.log("hola");  
  return "Hola";
};  

module.exports = {sayHelloInEnglish,sayHelloInSpanish}