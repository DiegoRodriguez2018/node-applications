function createCounter() {
    let counter = 0
    const myFunction = function() {
      counter = counter + 1
      return counter
    }
    return myFunction //so here we are returning a fucntion but also a CLOSURE. 
    //a closure is just like a little backpack that has all the variables created when we first creted our function. (in this case counter)
  }
  
  const increment = createCounter()
  const c1 = increment() // 1
  const c2 = increment() // 2 because it rememebers the value of counter from before. (is in the closure)
  const c3 = increment() // 3 
  
  const increment2 = createCounter()
  const c4 = increment2() // 1 again because is a new instance. 
  const c5 = increment2() // 2 
  
  console.log('example increment', c1, c2, c3, c4, c5)