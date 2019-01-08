const chalk = require('chalk')

function secondsToString(uptime) {
    if(uptime > 86400) {
      uptime = uptime/86400;
   return (("Uptime:" + uptime.toFixed(3) + " days"));
    } else if (uptime > 3600) {
      uptime = uptime/3600;
   return (("Uptime:" + uptime.toFixed(2) + " hours"));
    } else if (uptime > 60) {
      uptime = uptime/60;
   return (("Uptime:" + uptime.toFixed(1) + " minutes"));
    } else {
   return (("Uptime:" + uptime.toFixed(0) + " seconds"));
    }
}

const os = require('os')

const hostName =  os.hostname() 
console.log('hostName',': ', hostName)

//How long since your computer has been on. 
const upTime = os.uptime()
secondsToString(upTime)

const platform = os.platform()
console.log('platform',': ', platform);

const osType = os.type()
console.log('osType',': ', osType);

const totalMemory = os.totalmem()
const totalMemoryJson = ('Total memory'+': '+ totalMemory/1000000000+ 'Gb');
console.log('totalMemory',': ', totalMemory);

const freeMemory = os.freemem()
console.log('Free memory',': ', freeMemory/1000000000, 'Gb');

const percentageMemory = ((freeMemory/totalMemory)*100).toFixed(2)
console.log('percentageMemory (free)',': ', percentageMemory, '%');




//Server:
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
        
        const responseData =[{
            "Host Name":hostName,
            "Uptime": secondsToString(upTime),
            "platform": platform,
            "osType": osType,
            "totalMemory": totalMemoryJson,
            "freeMemory": freeMemory,
            "percentageMemory": percentageMemory
          }]

        const data = JSON.stringify(responseData) 

        response.write(data)
        response.end()
    
        
    })


// To display something in terminal add a callback to server.listen:  
const hostname = 'localhost'
server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});