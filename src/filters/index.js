
export function isk (value) {
  return value.toLocaleString('us', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' ISK'
}
