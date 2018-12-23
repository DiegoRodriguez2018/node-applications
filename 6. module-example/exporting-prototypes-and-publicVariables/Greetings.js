// Public variable accessible to other functions.
let total = 1;

function Greetings (name){
  this.name = name;
}

Greetings.prototype.sayHi = function (){
  console.log('Saying hi to: ', this.name);
  return (`Hi, ${this.name}`);
}

Greetings.prototype.count = function (){
  console.log(total);
  total = total + 1;
}

Greetings.prototype.restart = function (){
  total = 1;
}

module.exports = Greetings;