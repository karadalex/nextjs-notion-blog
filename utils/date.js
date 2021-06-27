export function dateIsoStringToReadable(dateString) {
  let date = dateString.split("T")[0]
  let time = dateString.split("T")[1].split(":")
  let hours = time[0]
  let minutes = time[1]
  time = `${hours}:${minutes}`

  return `${date}, ${time}`
}