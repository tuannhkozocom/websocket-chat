export function myMessage(user, message, sendAt) {
  return `
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div class="bg-blue-500 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm font-bold text-green-500">${user.name}</p>
          <p class="text-sm">${message}</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">${getTime(sendAt)}</span>
      </div>
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
      </div>
    </div>
  `
}

export function guestMessage(user, message, sendAt) {
  return `
    <div class="flex w-full mt-2 space-x-3 max-w-xs">
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
      </div>
      <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p class="text-sm font-bold text-blue-500">${user.name}</p>
          <p class="text-sm">${message}</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">${getTime(sendAt)}</span>
      </div>
    </div>
  `
}

export function getTime(time) {
  time = new Date(time)
  time = [time.getHours(), time.getMinutes(), time.getSeconds()].map((t) => String(t).padStart(2, 0)).join(':')
  return time
}
