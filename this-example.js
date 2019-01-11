// This is not so much a puzzle but more of an understanding of what's actually happening in different pieces of code. 

function jon(){
    console.log("In jon function")
    console.log(this)
}

const ruegen = () => {
    console.log("In Ruegen function")
    console.log(this)
}

gretch = {
    name: 'Gretch',
    printName: function(){
        console.log("In Gretch print")
        console.log(this)
    }
}

harrison = {
    name: 'Harrison',
    printName: () => {
        console.log("In Harrison print")
        console.log(this)
    }
}

// jon();
// ruegen();
// gretch.printName();
harrison.printName();