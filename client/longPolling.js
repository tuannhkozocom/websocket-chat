function longPolling() {
  // Make a request to the server
  fetch('/messages')
    .then((response) => {
      // If there is new data, handle it
      if (response.status === 200) {
        response.json().then((data) => {
          handleNewMessages(data)
        })
      }
      // Start the long polling cycle again
      longPolling()
    })
    .catch((error) => {
      // Handle any errors and start the long polling cycle again
      console.error(error)
      longPolling()
    })
}

function handleNewMessages(messages) {
  // Handle new messages here
  console.log(messages)
}

// Start the long polling cycle
longPolling()
