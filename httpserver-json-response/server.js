// This is a Node C library, beghind the scene its C but you get to configure it with javascript.
const http = require('http')
//This is File System library, we use it to read the data from index.html.  
const fs = require('fs')
//Just defining the port were our server will run. 
const PORT = 3000

const server = http.createServer((request,response)=> {
    response.statusCode = 200
        //Note we are adding what kind of file we are sending in setHeader
        // instead of response.setHeader = ('Content-Type', 'text/html') we do:
        response.setHeader = ('Content-Type', 'application/json')
        
        //Defining the path with __dirname
        const path = __dirname + '/books.json'
        
        //using File System Library
        fs.readFile(path, {encoding: 'utf-8'}, (errors, data)=>{
            response.write(data)
            
            //We send the element in response.end()
            response.end()
        })
        
    })


// To display something in terminal add a callback to server.listen:  
const hostname = 'localhost'
server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});