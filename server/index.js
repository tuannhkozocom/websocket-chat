import { createServer } from 'http'
import { parse } from 'url'
import { WebSocketServer, WebSocket } from 'ws'

const server = createServer()
const wss1 = new WebSocketServer({ noServer: true })

wss1.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('open', function () {
    console.log('connection is established')
  })

  ws.on('message', function (data) {
    wss1.clients.forEach(function (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false })
      }
    })
  })
})

server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = parse(request.url)

  if (pathname === '/chat') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request)
    })
  } else {
    socket.destroy()
  }
})

console.log('Server is running')
server.listen(8080)
