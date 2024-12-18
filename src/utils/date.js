const locales = 'de-DE'

export function formatDate(date) {
  const options = {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }

  const formatter = new Intl.DateTimeFormat(locales, options)
  const parts = formatter.formatToParts(date)

  // Reconstruct the format without the comma
  const day = parts.find(part => part.type === 'day').value
  const month = parts.find(part => part.type === 'month').value
  const hour = parts.find(part => part.type === 'hour').value
  const minute = parts.find(part => part.type === 'minute').value

  return `${day}. ${month} ${hour}:${minute}`
}
