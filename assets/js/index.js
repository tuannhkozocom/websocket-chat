import { myMessage, guestMessage } from './helper.js'

const form = document.getElementById('form')
const input = document.getElementById('input')
const chatPanel = document.getElementById('chatPanel')

const ws = new WebSocket('ws://localhost:8080/chat')

const user = {
  name: '',
}

ws.onopen = function () {
  while (!user?.name) {
    user.name = prompt('Socket connected successfully\nEnter your name: ')
  }
}

ws.onmessage = function (event) {
  console.log(event)
  const { user, message, sendAt } = JSON.parse(event.data)
  displayMessage(
    {
      name: user.name,
      isGuest: true,
    },
    message,
    sendAt
  )
}

ws.onclose = function () {
  alert('Websocket connection failed')
}

form.onsubmit = function (e) {
  e.preventDefault()

  ws.send(JSON.stringify({
    user: {
      name: user.name,
    },
    message: input.value,
    sendAt: new Date(),
  }))

  displayMessage(
    {
      name: user.name,
      isGuest: false,
    },
    input.value,
    new Date()
  )
  input.value = ''
}

function displayMessage(user, message, sendAt) {
  chatPanel.innerHTML =
    chatPanel.innerHTML + (user.isGuest ? guestMessage(user, message, sendAt) : myMessage(user, message, sendAt))
}
