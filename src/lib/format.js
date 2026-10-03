const numberFormat = new Intl.NumberFormat('az-AZ');
const timeFormat = new Intl.DateTimeFormat('az-AZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const decimalFormats = new Map();

export const formatNumber = (value) => numberFormat.format(value);
export const formatTime = (date) => timeFormat.format(date);

export function formatDecimal(value, fractionDigits = 1) {
  if (!decimalFormats.has(fractionDigits)) {
    decimalFormats.set(
      fractionDigits,
      new Intl.NumberFormat('az-AZ', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }),
    );
  }
  return decimalFormats.get(fractionDigits).format(value);
}