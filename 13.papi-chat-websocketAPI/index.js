var express = require('express')
var ws = require('ws')
var app = express()
const clients = [];



var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})
wss.on('connection', function (ws) {
    clients.push(ws);
    ws.on('message', function (message) {
        
        clients.forEach(client =>{
            client.send(message);
        })
  })
})

app.use(express.static("public"));



app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
})