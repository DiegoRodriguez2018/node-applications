class Greetings {
    constructor(name) {
        this.name = name;
    }

    sayHelloInSpanish(){
        console.log(`Hola, ${this.name}`)
    }

}


module.exports = Greetings;