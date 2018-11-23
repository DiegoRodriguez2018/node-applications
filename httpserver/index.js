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