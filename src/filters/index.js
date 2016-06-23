
export function isk (value) {
  return value.toLocaleString('us', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' ISK'
}

export function formattedNumber (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
