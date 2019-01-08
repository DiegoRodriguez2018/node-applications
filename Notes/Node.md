### Day 5
### Introduction to Node.

Js now is in the following paces now:
1. Web 
2. JS systems (Figma, slack, scode, atom)
3. Mongo DB.

npm is the biggest collection of libraries, more than python and ruby, that is because there is a lot of js developments. 

#### V8 Javascript engine:
V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Google Chrome, Node, MongoDB, and others. 


---
Making a server with node
We make a folder apps/node to store our node projects. 

Then we create a folder /node/httpserver and cd httpserver
We create a index.js inside this folder. 

In index.js we add the following:

```javascript
// This is a Node C library, beghind the scene its C but you get to configure it with javascript.
const http = require('http')
const PORT = 3000

const server = http.createServer((request,response)=> {
    response.statusCode = 200
        //Note we are adding what kind of file we are sending in setHeader
        response.setHeader = ('Content-Type', 'text/html')
        //We send the element in response.end()
        response.end(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>My title</title>
        </head>
        <body>
            <h1 style="color: blue">My website</h1>
        </body>
        </html>`)
    })


// To display something in terminal add a callback to server.listen:  
const hostname = 'localhost'
server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

```

---
Now we are going to add a file index.html and we are just going to reference it from index.js. 



